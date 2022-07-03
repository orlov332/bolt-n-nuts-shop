import { GetObjectCommand, GetObjectCommandInput } from '@aws-sdk/client-s3';
import { S3Handler } from 'aws-lambda';
import { s3Client } from '@libs/s3-client';
import middy from '@middy/core';
import inputOutputLogger from '@middy/input-output-logger';
import errorLogger from '@middy/error-logger';
import csvParser from 'csv-parser';

const importFileParser: S3Handler = async (event) => {

  for (const record of event.Records) {
    const bucketParams: GetObjectCommandInput = {
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
      ResponseContentType: 'text/csv',
      ResponseContentEncoding: 'utf-8',

    };
    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    data.Body
      .pipe(csvParser())
      .on('data', (data) => console.log(data));
  }
};

export const main = middy(importFileParser)
  .use(inputOutputLogger())
  .use(errorLogger());
