'use strict';
var path = require('path');
var chalk = require('chalk');
var express = require('express');

var envFileName = process.env.NODE_ENV === 'staging' ? 'stage' : 'dev';

require('dotenv').config({ path: path.join(__dirname, `${envFileName}.env`) });

var app = require('./src/');
var PORT = process.env.PORT || 3001;

var server = express();

server.use(app);

server.listen(PORT, () => {
  process.stdout.write('\x1B[2J\x1B[0f');
  console.log(chalk.magenta(`Api server running on port ${PORT}`));
});
