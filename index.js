var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/app.js', function(req, res) {
    res.sendFile(__dirname + '/app.js');
});
app.get('/app.css', function(req, res) {
    res.sendFile(__dirname + '/app.css');
});

io.on('connection', function(socket) {
    let name = socket.handshake.query.name;
    console.log('a user connected: ' + name);
    io.emit('chat_update', name + ' has connected');

    socket.on('chat message', function(msg) {
        msg = name + ': ' + msg;
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + name);
        io.emit('chat_update', name + ' has disconnected');
    });
});

http.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on *:' + port);
    }
});