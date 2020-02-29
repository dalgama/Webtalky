const io = require('socket.io')(3000)

io.on('connect', socket => {
    socket.emit('chat-message', 'hello world')
})