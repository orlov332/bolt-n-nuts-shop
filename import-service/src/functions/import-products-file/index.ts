import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const awsFunction: AWSFunction = {
  handler: `${ handlerPath(__dirname) }/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          name: 'basicTokenAuthorizer',
          arn: 'arn:aws:lambda:eu-west-1:145504082988:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
      },
    },
  ],
};

export default awsFunction;
