var express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { documentClient } = require('./utils/aws');
const { DynamoDBCRI } = require('dynamodb-cri');

var employeeRouter = require('./routes/employee');
var customerRouter = require('./routes/customer');
var orderRouter = require('./routes/order');

var app = express();

// Configure Morgan
app.use(morgan('short'));

// App config
app.use(bodyParser.json({ limit: '50mb' }));

// Configure CORS
app.use(cors());
app.options('*', cors()); // include before other routes

// DynamoDBModel configuration
app.use((req, res, next) => {
  DynamoDBCRI.config({
    documentClient,
    tenant: req.get('tenant'),
    indexName: 'gsik',
    tableName: `dynamodb-cri`
  });
  next();
});

app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/employee', employeeRouter);

// error handler
app.use(function(err, req, res, next) {
  console.log(err.stack);

  if (err.consoleMessage !== undefined) console.log(err.consoleMessage);

  res.status(400).json({
    message: err.message,
    name: err.name
  });
});

module.exports = app;
