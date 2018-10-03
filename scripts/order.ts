import { DynamoDB } from 'aws-sdk';
import cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random, pickOne } from './utils';
import * as chance from 'chance';

var chance = new chance();

var STATUS = ['open', 'closed', 'new', 'transit'];
export interface IOrderItem {
  pk: string;
  sk: string;
  gk: string;
  accountType: string;
  employeeId: string;
  total: number;
  salesRep: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 'date';
}

export async function orders() {
  for (let i = 0; i < 10; i++) {
    var item: IOrderItem = {
      pk: cuid(),
      sk: 'tenant|order',
      gk: chance.date({ string: true }),
      accountType: chance.word(),
      employeeId: cuid(),
      total: chance.integer({ min: 1000, max: 13000 }),
      salesRep: chance.name(),
      status: pickOne(STATUS),
      createdAt: new Date(
        Date.now() - 1000 * 60 * 60 * random(100)
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 'date'
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
        sk: 'tenant|order|employee',
        gk: item.employeeId,
        __v: 'employeeId',
        __p: JSON.stringify({ status: item.status, total: item.total })
      }
    });

    console.log(`${i}/${10}`);
  }
}
