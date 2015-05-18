var Field = function(canvas, beeHandler) {
    this.canvas = canvas;
    this.beeHandler = beeHandler;

    this.offset = [0, 0];

    this.name = null;
    this.color = null;
    this.program = null;
    this.level = null;
    this.bee = null;
};

Field.prototype.register = function(name, color) {
    this.name = name;
    this.color = color;
    this.loadLevel(level[1]);
};

Field.prototype.configure = function(program) {
    this.program = program;
};

Field.prototype.start = function() {
    var movements = {
            0: [0, -1],
            90: [1, 0],
            180: [0, 1],
            270: [-1, 0]
        },
        delay = 300,
        transforms = [],
        position = null,
        direction = null,
        crashed = false,
        success = false,
        closingAnimation = null;

    position = this.level.start;
    direction = this.level.direction;
    this.bee.moveToStart(position, direction);

    for (i in this.program) {
        var opcode = this.program[i];

        switch (opcode) {
            case "left":
                direction = direction - 90;
                break;

            case "right":
                direction = direction + 90;
                break;

            case "fly":
                var newPosition = [
                        position[0] + movements[direction % 360][0],
                        position[1] + movements[direction % 360][1],
                    ];

                if ((this.level.map[newPosition[1]][newPosition[0]] === undefined) ||
                    (this.level.map[newPosition[1]][newPosition[0]] === "x")) {
                    crashed = true;
                    break;
                }

                position = newPosition;
                break;

            case "stop":
                if (this.level.map[position[1]][position[0]] === "t") {
                    success = true;
                    break;
                }
        };

        if (crashed) {
            closingAnimation = this.bee.crashAnimation.bind(this.bee);
            break;
        }

        transforms.push([position, direction]);
    }

    // @TODO: Check if target has been reached and reset otherwise

    var animate = function() {
        var transform = transforms.shift();
        if (transform) {
            this.bee.move(transform[0], transform[1], animate.bind(this));
        } else if (closingAnimation) {
            closingAnimation.bind(this)((function() {
                this.bee.moveToStart(this.level.start, this.level.direction);
            }).bind(this));
        }
    };
    animate.bind(this)();
};

Field.prototype.loadLevel = function(level) {
    var map = [],
        width = 0,
        height = 0;

    $.each(level.field.split("\n"), function(i, row) {
        map[i] = [];
        for (var j = 0; j < row.length; ++j) {
            switch (row[j]) {
                case "t":
                case "x":
                    map[i][j] = row[j];
                    break;

                default:
                    map[i][j] = 0;
            }

            width = Math.max(width, row.length);
        };
        height = i;
    });
    
    this.offset = [
            Math.floor((this.canvas.width - (width * 50)) / 2),
            Math.floor((this.canvas.height - (height * 50)) / 2)
        ];

    this.canvas.clear();
    for (var i = 0; i <= width; ++i) {
        var position = this.offset[0] + (50 * i);
        this.canvas.path("M" + position + " " + this.offset[1] + "L" + position + " " + (this.offset[1] + 50 * height))
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }

    for (var i = 0; i <= height; ++i) {
        var position = this.offset[1] + (50 * i);
        this.canvas.path("M" + this.offset[0] + " " + position + "L" + (this.offset[0] + 50 * width) + " " + position)
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }

    for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
            var center = [
                    this.offset[0] + (i * 50) + 25,
                    this.offset[1] + (j * 50) + 25
                ];

            switch (map[j][i]) {
                case "x":
                    this.canvas.rect(center[0] - 22, center[1] - 22, 44, 44)
                        .attr("stroke", "none")
                        .attr("fill", "#000000")
                        .attr("fill-opacity", .5);
                    break;

                case "t":
                    this.canvas.circle(center[0], center[1], 20)
                        .attr("fill", "#ff0000");
                    break;
            };
        }
    }

    this.level = {
        start: level.start,
        direction: level.direction,
        map: map,
        width: width,
        height: height
    };

    this.bee = this.beeHandler.create(this.offset, this.color);
    this.bee.moveToStart(level.start, level.direction);
};
