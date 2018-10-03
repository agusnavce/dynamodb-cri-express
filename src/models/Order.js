'use strict';
const { DynamoDBCRI } = require('dynamodb-cri');

const Order = new DynamoDBCRI.Model({
  entity: 'order',
  gsik: 'date',
  indexes: [
    {
      indexName: 'employeeId',
      projections: ['status', 'total']
    }
  ],
  trackDates: true
});

exports = module.exports = Order;
