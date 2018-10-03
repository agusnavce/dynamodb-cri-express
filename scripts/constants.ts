export var TableName = 'dynamodb-cri';
export var IndexName = 'gsik';

export interface IGSIKItem {
  pk: string;
  sk: string;
  gk: string;
  __v: string;
  [key: string]: any;
}
