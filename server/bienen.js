var User = require('./user.js');

function Bienen(server) {
    this.server = server;
    this.users = {};
};

Bienen.prototype.registerPlayer = function(socket, playerData) {
    this.users[socket.id] = new User(
        socket,
        playerData.name || "Anonymous",
        playerData.color || "#edd400"
    );
    socket.emit("registered", {});

    console.log(playerData.name + " has registered.");
};

Bienen.prototype.configure = function(socket, program) {
}

Bienen.prototype.removePlayer = function(socket) {
    console.log(this.users[socket.id].name + " has disconnected.");
    delete this.users[socket.id]; 
}

Bienen.prototype.move = function() {
}

module.exports = Bienen;
