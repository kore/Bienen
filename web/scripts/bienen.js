var Field = function() {
    this.name = null;
    this.color = null;
};

Field.prototype.register = function(name, color) {
    this.name = name;
    this.color = color;
}
