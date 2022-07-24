import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const awsFunction: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'basic-authorizer',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export default awsFunction;
