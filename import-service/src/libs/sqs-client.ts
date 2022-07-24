import { SQSClient } from "@aws-sdk/client-sqs";

const REGION = process.env.AWS_REGION || 'eu-west-1';

export const sqsClient = new SQSClient({ region: REGION });
