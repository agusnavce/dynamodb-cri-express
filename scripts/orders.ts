import { DynamoDB } from 'aws-sdk';
import * as cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random, pickOne } from './utils';
import * as Chance from 'chance';

var rand = new Chance();

var STATUS = ['open', 'closed', 'new', 'transit'];
export interface IOrderItem {
  pk: string;
  sk: string;
  gk: string | Date;
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
  console.log('Creating Orders');
  for (let i = 0; i < 10; i++) {
    var item: IOrderItem = {
      pk: cuid(),
      sk: 'tenant|order',
      gk: rand.date({ string: true }),
      accountType: rand.word(),
      employeeId: cuid(),
      total: rand.integer({ min: 1000, max: 13000 }),
      salesRep: rand.name(),
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
        sk: 'tenant|order|employeeId',
        gk: item.employeeId,
        __v: 'employeeId',
        __p: JSON.stringify({ status: item.status, total: item.total })
      }
    });

    console.log(`${i}/${9}`);
  }
}
