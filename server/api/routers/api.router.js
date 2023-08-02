const express = require('express');

const controller = require('./api.controller');

const apiRouter = express.Router();

apiRouter.post('/addUser', controller.addUser);
apiRouter.post('/addRoom', controller.addRoom);
apiRouter.post('/authenticate', controller.userAuth);
apiRouter.get('/rooms', controller.getRooms);
apiRouter.post('/userRoom', controller.addUserRoom);
apiRouter.get('/userRoom/:uid', controller.getUserRooms);
apiRouter.get('/messages/:roomid', controller.getMessages)

module.exports = apiRouter;

