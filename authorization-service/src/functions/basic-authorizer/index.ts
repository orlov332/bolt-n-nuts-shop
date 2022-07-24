import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const basicAuthorizer: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'token',
        cors: true
      },
    },
  ],
};

export default  basicAuthorizer;
