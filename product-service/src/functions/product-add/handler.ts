import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getDbConnection } from '../../repository/db';
import { ProductRepository } from '../../repository/ProductRepository';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let client;
  try {
    client = getDbConnection();
    await client.connect();
    const productRepository = new ProductRepository(client);

    const newProduct = event.body;
    const product = await productRepository.addNew(newProduct);
    return formatJSONResponse(product);
  } finally {
    client && await client.end();
  }
};

export const main = middyfy(hello);
