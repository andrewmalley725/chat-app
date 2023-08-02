const express = require('express');

const controller = require('./api.controller');

const apiRouter = express.Router();

apiRouter.post('/addUser', controller.addUser);
apiRouter.post('/addRoom', controller.addRoom);
apiRouter.post('/authenticate', controller.userAuth);
apiRouter.get('/rooms', controller.getRooms);

module.exports = apiRouter;

