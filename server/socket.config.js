const inserter = require('./api/models/create');
const readers = require('./api/models/readers');

function configureSocket(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: ["http://localhost:3000", "https://admin.socket.io/#/"]
        }
    });
    
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        // socket.on('join-room', room => {
        //     console.log('joined ' + room);
        //     socket.join(room);
        // });
    
        socket.on('message', async (data) => {
            const record = await inserter.newMessage(data);
            const user = await readers.getUserById(data.userid);
            io.emit('message', {
                content: data.content,
                id: record[0],
                user: user
            });
        });
    });
}

module.exports = {
    configureSocket,
}
