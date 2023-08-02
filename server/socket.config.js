function configureSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);
    
        socket.on('message', (data) => {
            console.log(data.room);
            socket.to(data.room).emit('message', {
                id: data.id,
                data: data.data,
                room: data.room
            });
        });
    
        socket.on('join-room', room => {
            console.log('joined ' + room);
            socket.join(room);
        });
    });
}

module.exports = {
    configureSocket,
}
