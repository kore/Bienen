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
            }

            width = Math.max(width, row.length);
        };
        height = i;
    });
    
    var offsetX = Math.floor((this.canvas.width - (width * 50)) / 2),
        offsetY = Math.floor((this.canvas.height - (height * 50)) / 2);

    this.canvas.clear();
    for (var i = 0; i <= width; ++i) {
        var position = offsetX + (50 * i);
        this.canvas.path("M" + position + " " + offsetY + "L" + position + " " + (offsetY + 50 * height))
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }

    for (var i = 0; i <= height; ++i) {
        var position = offsetY + (50 * i);
        this.canvas.path("M" + offsetX + " " + position + "L" + (offsetX + 50 * width) + " " + position)
            .attr("stroke", "#000")
            .attr("stroke-width", "2px");
    }
};
