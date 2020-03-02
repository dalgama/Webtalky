const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server)
server.listen(process.env.PORT || 3001);
users = [];
connections = [];

console.log('Server is runnung')

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', socket => {
    connections.push(socket);
    socket.emit('chat-message', 'hello world');
    console.log('Connected: %s connected', connections.length);

    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s socket connected', connections.length);
})