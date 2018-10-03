var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

exports.DynamoDB = new AWS.DynamoDB(
  process.env.LOCAL_DYNAMODB_ENDPOINT !== undefined
    ? { endpoint: process.env.LOCAL_DYNAMODB_ENDPOINT }
    : undefined
);

exports.documentClient = new AWS.DynamoDB.DocumentClient({
  service: exports.DynamoDB
});