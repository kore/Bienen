var Field = function(canvas, beeHandler) {
    this.canvas = canvas;
    this.beeHandler = beeHandler;

    this.offset = [0, 0];

    this.name = null;
    this.color = null;
    this.program = null;
    this.bee = null;
};

Field.prototype.register = function(name, color) {
    this.name = name;
    this.color = color;
    this.loadLevel(level[0]);
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
        transforms = [];

    for (i in this.program) {
        var opcode = this.program[i];

        switch (opcode) {
            case "clockwise":
                this.bee.direction = (this.bee.direction + 90) % 360;
                break;

            case "fly":
                var newPosition = [
                        this.bee.position[0] + movements[this.bee.direction][0],
                        this.bee.position[1] + movements[this.bee.direction][1],
                    ];

                // @TODO: Verify new position is valid:
                //
                //  * Boundings
                //  * Field obstacles
                //  * Reached target

                this.bee.position = newPosition;
                break;
        };

        transforms.push(
            this.beeHandler.getTransformationString(
                this.bee.direction,
                [this.offset[0] + this.bee.position[0] * 50 + 25,
                 this.offset[1] + this.bee.position[1] * 50 + 25]
            )
        );
    }

    var animate = function() {
        var transform = transforms.shift();
        if (transform) {
            this.bee.element.animate({transform: transform}, delay);
            window.setTimeout(animate.bind(this), delay);
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
                    this.canvas.rect(center[0] - 20, center[1] - 20, 40, 40, 5)
                        .attr("fill", "#000000");
                    break;

                case "t":
                    this.canvas.circle(center[0], center[1], 20)
                        .attr("fill", "#ff0000");
                    break;
            };
        }
    }

    this.bee = {
        element: this.beeHandler.create(this.color)
            .transform(this.beeHandler.getTransformationString(
                level.direction,
                [this.offset[0] + level.start[0] * 50 + 25, this.offset[1] + level.start[1] * 50 + 25]
            )),
        position: level.start,
        direction: level.direction
    };
};
