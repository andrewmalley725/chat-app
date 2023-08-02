const inserter = require('./api/models/create');
const readers = require('./api/models/readers');

function configureSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        // socket.on('join-room', room => {
        //     console.log('joined ' + room);
        //     socket.join(room);
        // });
    
        socket.on('message', async (data) => {
            inserter.newMessage(data);
            const user = await readers.getUserById(data.userid);
            io.emit('message', {
                content: data.content,
                roomid: data.roomid,
                username: user.username
            });
        });
    
    });
}

module.exports = {
    configureSocket,
}
