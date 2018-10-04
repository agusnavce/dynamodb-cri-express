import { DynamoDB } from 'aws-sdk';
import * as cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as Chance from 'chance';

var rand = new Chance();

export interface IProductItem {
  pk: string;
  sk: string;
  gk: string;
  description: string;
  categoryId: number;
  barcode: string;
  createdAt: string;
  updatedAt: string;
  __v: 'name';
}

export async function products() {
  console.log('Creating Products');
  for (let i = 0; i < 10; i++) {
    var item: IProductItem = {
      pk: cuid(),
      sk: 'tenant|product',
      gk: JSON.stringify(rand.word()),
      description: rand.sentence({ words: 5 }),
      categoryId: rand.integer({ min: 0, max: 123 }),
      barcode: rand.hash({ length: 15 }),
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
        sk: 'tenant|product|category',
        gk: JSON.stringify(item.categoryId),
        __v: 'categoryId',
        __p: JSON.stringify({ barcode: item.barcode })
      }
    });

    console.log(`${i}/${9}`);
  }
}
