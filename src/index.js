var express = require('express');
var app = express();

app.use('/api', require('./app.js'));

app.use((req, res) =>
  res.status(404).json({
    message: 'Resource not found.',
    name: 'ResourceNotFoundError'
  })
);

module.exports = app;
