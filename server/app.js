const express = require('express');

const cors = require('cors');

const apiRouter = require('./api/routers/api.router');

const path = require('path');

const app = express();

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });

app.use(express.json());

app.use(express.urlencoded());

app.use('/api', apiRouter);

module.exports = app;