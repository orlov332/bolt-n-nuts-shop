import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { getDbConnection } from '../../repository/db';
import { ProductRepository } from '../../repository/ProductRepository';


const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  let client;
  try {
    client = getDbConnection();
    await client.connect();
    const productRepository = new ProductRepository(client);
    const products = await productRepository.getAll();
    return formatJSONResponse(products);
  } finally {
    client && await client.end();
  }
};

export const main = middyfy(getProductsList);
