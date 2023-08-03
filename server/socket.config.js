const inserter = require('./api/models/create');
const readers = require('./api/models/readers');

function configureSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: ["*"]
        }
    });
    
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        socket.on('join-room', room => {
            socket.join(room);
            console.log('join room ' + room)
        });

        socket.on('leave-room', room => {
            socket.leave(room);
            console.log('left room ' + room)
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected.');
        });
    
        socket.on('message', async (data, roomName) => {
            console.log(io.sockets.adapter.rooms)
            const record = await inserter.newMessage(data);
            const user = await readers.getUserById(data.userid);
            const context = {
                content: data.content,
                id: record[0],
                user: user,
                roomName: roomName
            };
            io.to(roomName).emit('message', context);
            console.log(`Message emitted to users in room ${roomName}`);            
        });
    });
}

module.exports = {
    configureSocket,
}
