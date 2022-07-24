import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const awsFunction: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'bolt-n-nuts-import',
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [ { prefix: 'uploaded/' } ],
      },
    },
  ],
};

export default awsFunction;
