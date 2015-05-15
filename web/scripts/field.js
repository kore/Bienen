var Field = function() {
    this.name = null;
    this.color = null;
    this.program = null;
};

Field.prototype.register = function(name, color) {
    this.name = name;
    this.color = color;
}

Field.prototype.configure = function(program) {
    this.program = program;
}

Field.prototype.start = function() {
    console.log("Start");
}
