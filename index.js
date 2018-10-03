'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/');
const server = awsServerlessExpress.createServer(app);

exports.handler = function(event, context) {
  return awsServerlessExpress.proxy(server, event, context);
};
