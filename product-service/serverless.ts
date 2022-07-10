import type { AWS } from '@serverless/typescript';
import 'dotenv/config';
import productList from '@functions/product-list';
import productById from '@functions/prodict-by-id';
import productAdd from '@functions/product-add';
import catalogBatchProcess from '@functions/catalog-batch-process';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [ 'serverless-esbuild' ],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      POSTGRESQL_HOST: process.env.POSTGRESQL_HOST,
      POSTGRESQL_PORT: process.env.POSTGRESQL_PORT,
      POSTGRESQL_USER: process.env.POSTGRESQL_USER,
      POSTGRESQL_DB_NAME: process.env.POSTGRESQL_DB_NAME,
      POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
      SQS_NEW_PRODUCT: { Ref: 'catalogItemsQueue' },
      SNS_IMPORT_TOPIC: { Ref: 'createProductTopic' },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: [
          { 'Fn::GetAtt': [ 'catalogItemsQueue', 'Arn' ] },
        ],
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: [
          { Ref: 'createProductTopic' },
        ],
      },
    ],
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'product-catalog-items-queue',
        },
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'product-catalog-import-topic',
        },
      },
      createProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          Endpoint: 'orlov332@gmail.com',
          TopicArn: { Ref: 'createProductTopic' },
        },
      },
    },
  },
  // import the function via paths
  functions: {
    productList,
    productById,
    productAdd,
    catalogBatchProcess,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [ 'aws-sdk', 'pg-native' ],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
