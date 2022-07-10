import { SNSClient } from "@aws-sdk/client-sns";

const REGION = process.env.AWS_REGION || 'eu-west-1';

export const snsClient = new SNSClient({ region: REGION });
