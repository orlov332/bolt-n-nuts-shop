import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const awsFunction: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        request: {
          parameters: {
            paths: {
              productId: true
            }
          },
        },
      },
    },
  ],
};

export default awsFunction;
