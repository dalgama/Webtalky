// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.Server(app);
const io = require('socket.io')(server);
const routes = require('./routes/api.js');

//Login libraries
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

users = [];
connections = [];

const SESSION_SECRET = "secret";
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

console.log('Server is runnung');

app.use(routes);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set(__dirname);

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get('/',checkAuthenticated,(req, res) => {
    res.render(__dirname + '/index.ejs',{ name: req.user.name });
});

app.get('/login',checkNotAuthenticated, (req, res) => {
  res.render(__dirname + '/index.ejs')
});

app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/topicSelect',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.post('/chat', (req, res) => {
    nickName = req.body.nickName;
    console.log(`data passed to chat ${nickName}`);
    res.render(__dirname + '/messages.ejs', {nickName:nickName, 'hell':'hello'});
});

// app.get('/topicSelect', checkAuthenticated, (req, res) => {
//   res.render(__dirname + '/topic_select.ejs')
// });

app.post('/topicSelect', (req, res) => {
    email = req.body.email;
    res.render(__dirname + '/topic_select.ejs', {userEmail: email});
});

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

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};

const start_server = server.listen(3031, () => {
    console.log('listening on *:3031');
});
