if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
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
const bcrypt = require('bcrypt');

app.use(routes);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set(__dirname);
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

const host = 'https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com';

app.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs');
});

app.get('/login',(req, res) => {
  res.render(__dirname + '/index.ejs')
});

app.post('/login', async(req,res) => {
  let path = '/prod/user';
  let email = req.body.email;
  
  const getUser = await https.get(host + path + '/' + email, (resp) => {
    let userData = '';
    resp.on('data', (chunk) => {
        userData += chunk;
    });
    resp.on('end', () => {
      if(userData !== 'Unable to get user'){
        userData = JSON.parse(userData);
      };

      if(typeof userData !== 'string'){
        if(bcrypt.compareSync(req.body.password, userData.Item.pwd)){
          res.render(__dirname + '/topic_select.ejs', {userEmail: email});
        }else{
          status = "The Email address or password you provided is incorrect."
          res.render(__dirname +"/index.ejs", { loginStatus: status });
        }
      }else{
        status = "No account under this email. Please register."
        res.render(__dirname +"/index.ejs", { loginStatus: status });
      }
    });
  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
});

app.post('/chat', (req, res) => {
    nickName = req.body.nickName;
    console.log(`data passed to chat ${nickName}`);
    res.render(__dirname + '/messages.ejs', { nickName: nickName });
});

app.post('/topicSelect', (req, res) => {
    email = req.body.email
    res.render(__dirname + '/topic_select.ejs', { userEmail: email });
});

app.post('/register', async(req, res) => {
  let path = '/prod/user';
  let email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  const getUser = await https.get(host + path + '/' + email, (resp) => {
    let newUserData = '';
    let status = '';
    resp.on('data', (chunk) => {
        newUserData += chunk;
    });

    resp.on('end', () => {
      if(newUserData !== 'Unable to get user'){
        newUserData = JSON.parse(newUserData);
      }
      if(typeof newUserData !== 'string'){
        status = "Account with this email exists."
        res.render(__dirname +"/index.ejs", { loginStatus: status });

      }else{
        addUserDdb(email, req.body.name, hashedPassword);
        status = "New account created. Sign in."
        res.render(__dirname +"/index.ejs", { statusMessage: status });
      }

    });
  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
});

let addUserDdb = function (id,nickName,hashedPassword) {
  let payload = {
      "userId": id,
      "nickName": nickName,
      "pwd": hashedPassword
  };
  request.post(host + '/prod/user', {
    json: payload
  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return false;
    }
  }) 
}

var connections = [];

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

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.get('*', function(req, res){
  res.render(__dirname + '/404.html');
});

const start_server = server.listen(3031, () => {
    console.log('Server is runnung');
    console.log('listening on *:3031');
});
