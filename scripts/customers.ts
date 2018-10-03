import { DynamoDB } from 'aws-sdk';
import cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as chance from 'chance';

var chance = new chance();

export interface ICustomerItem {
  pk: string;
  sk: string;
  gk: string;
  address: string;
  incomeLevel: string;
  creditLimit: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: 'name';
}

export async function customers() {
  for (let i = 0; i < 10; i++) {
    var item: ICustomerItem = {
      pk: cuid(),
      sk: 'tenant|customer',
      gk: chance.name(),
      address: chance.address(),
      incomeLevel: chance.integer({ min: 1000, max: 10000 }),
      creditLimit: chance.integer({ min: 2000, max: 80000 }),
      phoneNumber: chance.phone(),
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

    console.log(`${i}/${10}`);
  }
}
