var User = require('./user.js');
var Bee = require('./bee.js');
var _ = require('underscore');

function Bienen(server) {
    this.field = [0, 0, 600, 600];
    this.server = server;
    this.users = {};
};

Bienen.prototype.registerPlayer = function(socket, playerData) {
    this.users[socket.id] = new User(
        socket,
        playerData.name || "Anonymous",
        new Bee(
            playerData.color || "#edd400",
            [300, 300]
        )
    );
    socket.emit("registered", {});

    console.log(playerData.name + " has registered.");
};

Bienen.prototype.configure = function(socket, program) {
    console.log(this.users[socket.id].name + " got reprogrammed.");
    this.users[socket.id].program = program;
    this.users[socket.id].programmed = new Date();
}

Bienen.prototype.removePlayer = function(socket) {
    if (this.users[socket.id]) {
        console.log(this.users[socket.id].name + " has disconnected.");
        delete this.users[socket.id];
    }
}

Bienen.prototype.move = function() {
    this.server.emit(
        "bees",
        _.map(
            this.users,
            function (user, id) {
                return {
                    id: id,
                    name: user.name,
                    bee: user.bee
                };
            }
        )
    );   
}

module.exports = Bienen;
