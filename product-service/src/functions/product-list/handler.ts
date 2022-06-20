import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
// @ts-ignore
import productList from '../../productList.json' assert { type: 'json' };


const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse(productList);
};

export const main = middyfy(getProductsList);
