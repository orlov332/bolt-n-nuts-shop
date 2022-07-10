import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3Handler } from 'aws-lambda';
import { s3Client } from '@libs/s3-client';
import middy from '@middy/core';
import inputOutputLogger from '@middy/input-output-logger';
import errorLogger from '@middy/error-logger';
import csvParser from 'csv-parser';
import { sqsClient } from '@libs/sqs-client';
import { SendMessageCommand } from '@aws-sdk/client-sqs';

const { SQS_NEW_PRODUCT } = process.env;

const importFileParser: S3Handler = async (event) => {

  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const fileName = record.s3.object.key;

    const data = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }));

    data.Body
      .pipe(csvParser())
      .on('data', async (data) => {
        console.log('Send product to SQS', data);
        await sqsClient.send(
          new SendMessageCommand({
            QueueUrl: SQS_NEW_PRODUCT,
            MessageBody: JSON.stringify(data),
          }));
      })
      .on('end', () => {
        console.log('No more data.');
      });

    // Move file to parsed
    await s3Client.send(new CopyObjectCommand({
      CopySource: `${ bucketName }/${ fileName }`,
      Bucket: bucketName,
      Key: fileName.replace('uploaded/', 'parsed/'),
    }));
    await s3Client.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    }));
  }

};

export const main = middy(importFileParser)
  .use(inputOutputLogger())
  .use(errorLogger());
