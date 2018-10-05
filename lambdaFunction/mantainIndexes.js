const { DynamoDBCRI } = require('dynamodb-cri');
const Customer = require('../src/models/Customer');
const Employee = require('../src/models/Employee');
const Order = require('../src/models/Order');

/**
 * Lambda function handler to maintain all the indexes by consuming the table's
 * stream.
 */
exports.handler = async event => {
  await DynamoDBCRI.hookDynamoDBStreams([Customer, Employee, Order], event);
};
