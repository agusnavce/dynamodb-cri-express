'use strict';
const { DynamoDBCRI } = require('dynamodb-cri');

const Customer = new DynamoDBCRI.Model({
  entity: 'customer',
  gsik: 'name',
  trackDates: true
});

exports = module.exports = Customer;
