import { SQSHandler } from 'aws-lambda';
import { getDbConnection } from '../../repository/db';
import { ProductRepository } from '../../repository/ProductRepository';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import inputOutputLogger from '@middy/input-output-logger';
import { snsClient } from '@libs/sns-client';
import { PublishCommand } from '@aws-sdk/client-sns';

const { SNS_IMPORT_TOPIC } = process.env;

const catalogBatchProcess: SQSHandler = async (event) => {
  let client;
  try {
    client = getDbConnection();
    await client.connect();
    const productRepository = new ProductRepository(client);

    for (const record of event.Records) {
      console.log('Received message: ', record);
      const newProduct = JSON.parse(record.body);
      const product = await productRepository.addNew(newProduct);

      // Send Notification
      await snsClient.send(
        new PublishCommand({
          TopicArn: SNS_IMPORT_TOPIC,
          Message: `Product with title "${product.title}" (id: ${product.id}) imported`,
        }));
    }
  } finally {
    client && await client.end();
  }
};

export const main = middy(catalogBatchProcess)
  .use(inputOutputLogger())
  .use(errorLogger());
