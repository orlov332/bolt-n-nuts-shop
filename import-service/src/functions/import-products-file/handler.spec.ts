import { importProductsFile } from './handler';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('@aws-sdk/s3-request-presigner');

describe('importProductsFile function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call getSignedUrl function when performing importProductsFile func', async () => {

    const event: any = { queryStringParameters: { name: 'text' } };

    await importProductsFile(event, undefined, undefined);

    expect(getSignedUrl).toBeCalled();
  });
});
