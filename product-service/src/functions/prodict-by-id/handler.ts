import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { getDbConnection } from '../../repository/db';
import { ProductRepository } from '../../repository/ProductRepository';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let client;
  try {
    client = getDbConnection();
    await client.connect();

    const productId = event.pathParameters.productId;
    const productRepository = new ProductRepository(client);

    const product = await productRepository.getById(productId);

    return product && formatJSONResponse(product) || formatErrorResponse(404, 'Product not found');
  } finally {
    client && await client.end();
  }
};

export const main = middyfy(getProductById);
