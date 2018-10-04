import { DynamoDB } from 'aws-sdk';
import * as cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as Chance from 'chance';

var rand = new Chance();

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
  console.log('Creating Employees');
  for (let i = 0; i < 10; i++) {
    var item: IEmployeeItem = {
      pk: cuid(),
      sk: 'tenant|employee',
      gk: rand.name(),
      email: 'string',
      jobId: cuid(),
      orderId: cuid(),
      orderTotal: rand.integer({ min: 1000, max: 13000 }),
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
        gk: JSON.stringify(item.open),
        __p: JSON.stringify({ orderId: item.orderId }),
        __v: 'open'
      }
    });

    await AWS.put({
      ...params,
      Item: {
        pk: item.pk,
        sk: 'tenant|employee|conf',
        gk: rand.date({ string: true }),
        salary: rand.integer({ min: 2000, max: 8000 }),
        commision: rand.integer({ min: 200, max: 800 }),
        __v: 'hireDate'
      }
    });

    console.log(`${i}/${9}`);
  }
}
