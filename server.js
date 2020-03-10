const express = require('express');
const app = express();
const server = require('http').Server(app);
const http = require('http');
const io = require('socket.io')(server);
users = [];
connections = [];

console.log('Server is runnung')

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

    socket.on('user_login', username => {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
        connections.splice(connections.indexOf(socket), 1);
        io.emit('is_offline', '🔴 <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', msg => {
        msg.username = socket.username;
        io.emit('chat_message', msg)
    });
});

function get() {
    exports.handler = async (event, context) => {

        return new Promise((resolve, reject) => {
            const options = {
                host: 'u0bqxo1avb.execute-api.us-east-1.amazonaws.com',
                path: '/prod/user/123',
                port: 8000,
                method: 'GET'
            };

            const request = http.request(options, (res) => {
                resolve('Success');
            });

            request.on('error', (e) => {
                reject(e.message);
            });

            request.write('');
            request.end();
        });
    };
};


app.get('/topics', (req, res) => {
    console.log('topic request recived');
    
});


const server = http.listen(3031, () => {
    console.log('listening on *:3031');
});
