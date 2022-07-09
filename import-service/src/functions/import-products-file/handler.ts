import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@libs/s3-client';

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const fileName = event.queryStringParameters.name;
  console.log('Requested name:', fileName)

  const bucketParams: PutObjectCommandInput = {
    Bucket: `bolt-n-nuts-import`,
    Key: `uploaded/${fileName}`,
    ContentType: 'text/csv',
  };
  const command = new PutObjectCommand(bucketParams);
  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });

  console.log('SignedUrl: ', uploadUrl);
  return {
    statusCode: 200,
    body: uploadUrl,
  };
};

export const main = middyfy(importProductsFile);
