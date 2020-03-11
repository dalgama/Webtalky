const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const routes = require('./routes/api.js');

users = [];
connections = [];

console.log('Server is runnung')

app.use(routes);
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/messages.html');
});

app.get('/topicSelect', (req, res) => {
    res.sendFile(__dirname + '/topic_select.html');
});

io.sockets.on('connection', socket => {
    socket.emit('connect', 'connection established')
    connections.push(socket);
    console.log('Connected: %s connected,  id %s', connections.length, socket.id);

    socket.on('user_login', (username) => {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
        connections.splice(connections.indexOf(socket), 1);
        io.emit('is_offline', '🔴 <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', (msg) => {
        msg.username = socket.username;
        io.emit('chat_message', msg)
    });
});

const start_server = server.listen(3031, () => {
    console.log('listening on *:3031');
});
