import type { AWS } from '@serverless/typescript';

import productList from '@functions/product-list';
import productById from '@functions/prodict-by-id';

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
      POSTGRESQL_HOST: 'bolt-n-nuts-products.c6dtehq3bdda.eu-west-1.rds.amazonaws.com',
      POSTGRESQL_PORT: '5432',
      POSTGRESQL_USER: 'postgres',
      POSTGRESQL_DB_NAME: 'bolt_n_nuts',
      POSTGRESQL_PASSWORD: 'JnJ4UcTXYezH14MIF9i1',
    },
  },
  // import the function via paths
  functions: { productList, productById },
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
