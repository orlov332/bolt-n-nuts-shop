import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/aws-function';

const awsFunction: AWSFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: { 'Fn::GetAtt': ['catalogItemsQueue', 'Arn'] },
      },
    },
  ],
};

export default awsFunction;
