### Example of using DynamoDB-CRI with express

You have two options:

Initiate locally or instantiate in aws.

First install the dependencies

```bash
yarn install

or 

npm install
```

#### Local

You can use [dynalite](https://github.com/mhart/dynalite) to have the DB locally.

Create the table:

```
 yarn createTable
```

Start the API:

```
yarn start
```

#### AWS

For this task we are using serverless, install it:

```bash
npm install -g serverlesss
```

Just modify these variables in the `serverless.yml`

```yaml
custom:

  serviceId: your_service_id

  region: aws_region

  lastestStreamARN: lastest_stream_arn
```

and do a:

```bash
sls deploy
```
------

There is a script to populate the DB, just do:

```bash
yarn createEntities
```

