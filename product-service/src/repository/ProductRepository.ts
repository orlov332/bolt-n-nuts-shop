import { Client } from 'pg';

export class ProductRepository {

  constructor(
    private client: Client,
  ) {
  }

  getAll = async () =>
    this.client.query('select * from products')
      .then(res => res.rows);

}
