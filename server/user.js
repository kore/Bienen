function User(socket, name, color) {
    this.socket = socket;
    this.name = name;
    this.color = color;
    this.registered = new Date();
    this.program = {};
}

module.exports = User;
