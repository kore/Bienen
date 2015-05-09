function Bee(color, position) {
    this.position = position || [0, 0];
    this.direction = 0;
    this.color = color;
}

module.exports = Bee;
