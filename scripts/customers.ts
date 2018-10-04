import { DynamoDB } from 'aws-sdk';
import * as cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as Chance from 'chance';

var rand = new Chance();

export interface ICustomerItem {
  pk: string;
  sk: string;
  gk: string;
  address: string;
  incomeLevel: number;
  creditLimit: number;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: 'name';
}

export async function customers() {
  console.log('Creating Customers');
  for (let i = 0; i < 10; i++) {
    var item: ICustomerItem = {
      pk: cuid(),
      sk: 'tenant|customer',
      gk: JSON.stringify(rand.name()),
      address: rand.address(),
      incomeLevel: rand.integer({ min: 1000, max: 10000 }),
      creditLimit: rand.integer({ min: 2000, max: 80000 }),
      phoneNumber: rand.phone(),
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

    console.log(`${i}/${9}`);
  }
}
