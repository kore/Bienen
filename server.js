var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    Bienen = require('./server/bienen.js'),
    config = require('./server/config.json');

server.listen(config.server.port);
bienen = new Bienen(server);

app.configure(function(){
    app.use(express.static(__dirname + '/web'));
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/web/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('register', function (data) {
        bienen.registerPlayer(socket, data);
    });
    socket.on('configure', bienen.configure);
});

setInterval(bienen.move, 1000);

console.log('Access server through http://127.0.0.1:' + config.server.port + '/');

