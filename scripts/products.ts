import { DynamoDB } from 'aws-sdk';
import cuid from 'cuid';
import { TableName } from './constants';
import AWS from './aws';
import { random } from './utils';
import * as chance from 'chance';

var chance = new chance();

export interface IProductItem {
  pk: string;
  sk: string;
  gk: string;
  description: string;
  categoryId: string;
  barcode: string;
  createdAt: string;
  updatedAt: string;
  __v: 'name';
}

export async function products() {
  for (let i = 0; i < 10; i++) {
    var item: IProductItem = {
      pk: cuid(),
      sk: 'tenant|product',
      gk: chance.name(),
      description: chance.sentence({ words: 5 }),
      categoryId: chance.integer({ min: 0, max: 123 }),
      barcode: chance.hash({ length: 15 }),
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
        gk: item.categoryId,
        __v: 'categoryId',
        __p: JSON.stringify({ barcode: item.barcode })
      }
    });

    console.log(`${i}/${10}`);
  }
}
