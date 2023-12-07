const express = require('express');

const cors = require('cors');

const apiRouter = require('./api/routers/api.router');

const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded());

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

module.exports = app;