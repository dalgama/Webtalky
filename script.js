const socket = io('http://localhost:3000')

io.on('connection', socket => {
    socket.emit('chat-message', 'hello wotld')
})