import { main as getProductsList } from './handler';

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

describe('Test getProductsList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should return product', async () => {
    const product = await getProductsList({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0' } }, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(200);
  });
});
