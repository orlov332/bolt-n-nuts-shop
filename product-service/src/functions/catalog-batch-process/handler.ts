import { SQSHandler } from 'aws-lambda';
import { getDbConnection } from '../../repository/db';
import { ProductRepository } from '../../repository/ProductRepository';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import inputOutputLogger from '@middy/input-output-logger';

const catalogBatchProcess: SQSHandler = async (event) => {
  let client;
  try {
    client = getDbConnection();
    await client.connect();
    const productRepository = new ProductRepository(client);

    for (const record of event.Records) {
      const newProduct = JSON.parse(record.body);
      await productRepository.addNew(newProduct);
    }
  } finally {
    client && await client.end();
  }
};

export const main = middy(catalogBatchProcess)
  .use(inputOutputLogger())
  .use(errorLogger());
