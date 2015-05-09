function User(socket, name, bee) {
    this.socket = socket;
    this.registered = new Date();
    this.name = name;
    this.bee = bee;
    this.programmed = null;
    this.program = {};
}

module.exports = User;
