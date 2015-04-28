var User = require('./user.js');

function Bienen(server) {
    this.server = server;
    this.users = {};
};

Bienen.prototype.registerPlayer = function(userSocket, playerData) {
    this.users[userSocket.id] = new User(
        userSocket,
        playerData.name || "Anonymous",
        playerData.color || "#edd400"
    );
    userSocket.emit("registered", {});

    console.log(this.users);
};

Bienen.prototype.configure = function(program) {
}

Bienen.prototype.move = function() {
}

module.exports = Bienen;
