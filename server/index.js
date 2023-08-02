const app = require('./app');

const { configureSocket } = require('./socket.config')

const PORT = 8000;

const server = require('http').Server(app);

configureSocket(server);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});