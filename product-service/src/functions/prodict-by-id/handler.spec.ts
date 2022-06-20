import { main as getProductById } from "./handler.ts";

describe('Test getProductById', () => {
  it('Should return product', async () => {
    const product = await getProductById({pathParameters: {productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0'}}, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(200);
  });

  it('Should return error', async () => {
    const product = await getProductById({pathParameters: {productId: 'unknown id'}}, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(404);
  });
});
