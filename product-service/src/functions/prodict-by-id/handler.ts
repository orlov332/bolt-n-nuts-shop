import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatErrorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// @ts-ignore
import productList from '../../productList.json' assert { type: 'json' };
import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = productList.find(p => p.id === event.pathParameters.productId);

  return product && formatJSONResponse(product) || formatErrorResponse(404, 'Product not found');
};

export const main = middyfy(getProductById);
