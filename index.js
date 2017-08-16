var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    let name = socket.handshake.query.name;
    console.log('a user connected: ' + name);
    io.emit('chat_update', name + ' has connected');

    socket.on('chat message', function(msg){
        msg = name + ': ' + msg;
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + name);
        io.emit('chat_update' , name + ' has disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
