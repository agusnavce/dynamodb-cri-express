'use strict';
const { DynamoDBCRI } = require('dynamodb-cri');

class EmployeeModel extends DynamoDBCRI.Model {
  constructor(config) {
    super(config);
  }
  async getConfidential(id) {
    var data = await this.query({
      index: 'conf',
      keyCondition: {
        values: [{ ':key': id }],
        expression: '#key = :key'
      }
    });
    return data.items[0];
  }
  async putConfidential(body) {
    await this.create(body, 'conf');
  }
  async updateConfidential(body) {
    await this.update(body, 'conf');
  }
}

const Employee = new EmployeeModel({
  entity: 'employee',
  gsik: 'name',
  indexes: [{ indexName: 'open' }],
  trackDates: true
});

exports = module.exports = Employee;
