import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  return formatJSONResponse({
    event,
  });
};

export const main = middyfy(importProductsFile);
