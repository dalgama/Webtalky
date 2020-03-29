const express = require('express');
const http = require('http');
const https = require('https');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.Server(app);
const io = require('socket.io')(server);
const routes = require('./routes/api.js');

users = [];
connections = [];

console.log('Server is runnung')

app.use(routes);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs');
});

app.post('/chat', (req, res) => {
    nickName = req.body.nickName;
    console.log(`data passed to chat ${nickName}`);
    res.render(__dirname + '/messages.ejs', { nickName: nickName, 'hell': 'hello' });
});

app.post('/topicSelect', (req, res) => {
    email = req.body.email
    res.render(__dirname + '/topic_select.ejs', { userEmail: email });
});

let addNewUser = function (id, callBack) {
    //implemnet, call ddb to check if user exist
    //sugestion check this pipe functionality https://www.npmjs.com/package/request
    let myCall = true;
    if (myCall) {
        callBack(id);
    }
}

let addUserDdb = function (newId) {
    let host = 'https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com'
    let payload = {
        "userId": "test@ddb.com",
        "nickName": "don",
        "pwd": "500"
    };

    request.post(host + '/prod/user', {
        json: payload
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        // if status code == 201 blablabla
        console.log(body)
    })
}

addNewUser('newid', addUserDdb);

io.sockets.on('connection', socket => {
    socket.emit('connect', 'connection established');
    connections.push(socket);
    console.log('Connected: %s connected,  id %s', connections.length, socket.id);

    socket.on('user_login', (username) => {
        socket.username = username;
        io.emit('is_online', socket.username);
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
