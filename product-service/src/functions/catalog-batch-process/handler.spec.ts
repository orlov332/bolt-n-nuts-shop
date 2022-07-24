import { main as catalogBatchProcess } from '@functions/catalog-batch-process/handler';
import { ProductRepository } from '../../repository/ProductRepository';
import { SNSClient } from '@aws-sdk/client-sns';

jest.mock('../../repository/db', () => ({
  getDbConnection: () => ({ connect: jest.fn(), end: jest.fn() }),
}));
jest.mock('../../repository/ProductRepository');
jest.mock('@aws-sdk/client-sns');

describe('Test catalogBatchProcess', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should add product from SQS message', async () => {
    const productRepositoryAddNew = jest.spyOn(ProductRepository.prototype, 'addNew')
      .mockImplementation(async () => {
      return { id: 'Test id', title: 'Test title' } as any;
    });
    const snsClientSend = jest.spyOn(SNSClient.prototype, 'send')


    await catalogBatchProcess({ Records: [ { body: '{ "id": "123123" }' } as any ] }, undefined);

    expect(productRepositoryAddNew).toHaveBeenCalled();
    expect(snsClientSend).toHaveBeenCalled();
  });
});
