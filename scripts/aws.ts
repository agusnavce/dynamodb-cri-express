import * as aws from 'aws-sdk';

var DynamoDB = new aws.DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8989'
});
var DocumentClient = new aws.DynamoDB.DocumentClient({
  service: DynamoDB
});

class AWS {
  put(
    input: aws.DynamoDB.DocumentClient.PutItemInput
  ): Promise<aws.DynamoDB.DocumentClient.PutItemOutput> {
    return DocumentClient.put(input).promise();
  }
  createTable(
    input: aws.DynamoDB.CreateTableInput
  ): Promise<aws.DynamoDB.CreateTableOutput> {
    return DynamoDB.createTable(input).promise();
  }
}

export default new AWS();
