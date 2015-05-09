var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    Bienen = require('./server/bienen.js'),
    config = require('./server/config.json'),
    bienen = new Bienen(io),
    bindSocket = function(fn, socket) {
        return function() {
            fn.apply(bienen, [socket, arguments[0]]);
        }
    };

server.listen(config.server.port);

app.configure(function(){
    app.use(express.static(__dirname + '/web'));
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/web/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('register', bindSocket(bienen.registerPlayer, socket));
    socket.on('configure', bindSocket(bienen.configure, socket));
    socket.on('disconnect', bindSocket(bienen.removePlayer, socket));
});


setInterval(bienen.move.bind(bienen), 1000);

console.log('Access server through http://127.0.0.1:' + config.server.port + '/');

