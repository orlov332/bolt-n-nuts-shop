import { main as getProductsList } from "./handler.ts";

describe('Test getProductsList', () => {
  it('Should return product', async () => {
    const product = await getProductsList({pathParameters: {productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0'}}, {} as any);

    expect(product).toBeDefined();
    expect(product.statusCode).toBe(200);
  });
});
