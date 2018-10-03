import { DynamoDB } from 'aws-sdk';
import cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as chance from 'chance';

var chance = new chance();

export interface IEmployeeItem {
  pk: string;
  sk: string;
  gk: string;
  email: string;
  jobId: string;
  orderId: string;
  orderTotal: number;
  open: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 'name';
}

export async function employees() {
  for (let i = 0; i < 10; i++) {
    var item: IEmployeeItem = {
      pk: cuid(),
      sk: 'tenant|employee',
      gk: chance.name(),
      email: 'string',
      jobId: cuid(),
      orderId: cuid(),
      orderTotal: chance.integer({ min: 1000, max: 13000 }),
      open: true,
      createdAt: new Date(
        Date.now() - 1000 * 60 * 60 * random(100)
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 'name'
    };

    var params: DynamoDB.DocumentClient.PutItemInput = {
      TableName,
      Item: item
    };

    await AWS.put(params);

    await AWS.put({
      ...params,
      Item: {
        pk: item.pk,
        sk: 'tenant|employee|open',
        gk: item.orderId,
        __v: 'orderId'
      }
    });

    await AWS.put({
      ...params,
      Item: {
        pk: item.pk,
        sk: 'tenant|employee|confidential',
        gk: chance.date({ string: true }),
        salary: chance.integer({ min: 2000, max: 8000 }),
        commision: chance.integer({ min: 200, max: 800 }),
        __v: 'hireDate'
      }
    });

    console.log(`${i}/${10}`);
  }
}
