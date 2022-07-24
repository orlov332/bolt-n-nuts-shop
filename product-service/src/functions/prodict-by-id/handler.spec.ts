import { main as getProductById } from './handler';
import { ProductRepository } from '../../repository/ProductRepository';

jest.mock('../../repository/db', () => ({
  getDbConnection: () => ({ connect: jest.fn(), end: jest.fn() }),
}));
jest.mock('../../repository/ProductRepository');
jest.mock('@libs/lambda', () => {
  return {
    middyfy(handler) {
      return handler;
    },
  };
});
describe('Test getProductById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should return product', async () => {
    jest.spyOn(ProductRepository.prototype, 'getById')
      .mockImplementation(async (_: string) => {
        return { id: 'Test error' };
      });

    const product = await getProductById({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0' } }, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(200);
  });

  it('Should return error', async () => {
    const product = await getProductById({ pathParameters: { productId: 'unknown id' } }, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(404);
  });
});
