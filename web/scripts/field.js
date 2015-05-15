var Field = function(canvas) {
    this.name = null;
    this.color = null;
    this.program = null;
    this.canvas = canvas;
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
    console.log("Start");
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
    console.log(map);
    
    var offset = [
            Math.floor((this.canvas.width - (width * 50)) / 2),
            Math.floor((this.canvas.height - (height * 50)) / 2)
        ];

    this.canvas.clear();
    for (var i = 0; i <= width; ++i) {
        var position = offset[0] + (50 * i);
        this.canvas.path("M" + position + " " + offset[1] + "L" + position + " " + (offset[1] + 50 * height))
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }

    for (var i = 0; i <= height; ++i) {
        var position = offset[1] + (50 * i);
        this.canvas.path("M" + offset[0] + " " + position + "L" + (offset[0] + 50 * width) + " " + position)
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }

    for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
            var center = [
                    offset[0] + (i * 50) + 25,
                    offset[1] + (j * 50) + 25
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
};
