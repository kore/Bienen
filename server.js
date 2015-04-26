var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    config = require('./config.json');

server.listen(config.server.port);

app.configure(function(){
    app.use(express.static(__dirname + '/web'));
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/web/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { date: new Date(), text: 'You are connected to the server' });
    socket.on('message', function (data) {
        io.sockets.emit('message', {
            date: new Date(),
            name: data.name || 'Anonymous',
            text: data.text
        });
    });
});

console.log('Access server through http://127.0.0.1:' + config.server.port + '/');

