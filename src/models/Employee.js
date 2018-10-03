'use strict';
const { DynamoDBCRI } = require('dynamodb-cri');

class EmployeeModel extends DynamoDBCRI.Model {
  constructor(config) {
    super(config);
  }
  async getOrderInfo(id) {
    var data = await this.query({
      keyCondition: {
        values: [{ ':id': id }],
        expression: '#key = :id'
      }
    });
    return data;
  }
}

const Employee = new EmployeeModel({
  entity: 'employee',
  gsik: 'name',
  indexes: [{ indexName: 'open' }, { indexName: 'conf' }],
  trackDates: true
});

exports = module.exports = Employee;
