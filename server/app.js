const express = require('express');

const cors = require('cors');

const apiRouter = require('./api/routers/api.router');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use('/api', apiRouter);

module.exports = app;