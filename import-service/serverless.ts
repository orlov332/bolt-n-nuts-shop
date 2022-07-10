import type { AWS } from '@serverless/typescript';
import importProductsFile from '@functions/import-products-file';
import importFileParser from '@functions/import-file-parser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: [ 'serverless-esbuild' ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SQS_NEW_PRODUCT: 'https://sqs.eu-west-1.amazonaws.com/145504082988/product-catalog-items-queue',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          'arn:aws:s3:::bolt-n-nuts-import/*',
        ],
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: [
          'arn:aws:sqs:eu-west-1:145504082988:product-catalog-items-queue'
        ],
      },
    ],
  },
  // import the function via paths
  functions: {
    importProductsFile,
    importFileParser,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [ 'aws-sdk' ],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
