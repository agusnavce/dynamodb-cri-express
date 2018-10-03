'use strict';
const { DynamoDBCRI } = require('dynamodb-cri');

const Product = new DynamoDBCRI.Model({
  entity: 'products',
  gsik: 'date',
  indexes: [{ indexName: 'category', projections: ['barcode'] }],
  trackDates: true
});

exports = module.exports = Product;
