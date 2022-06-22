import { Client } from 'pg';

const ALL_PRODUCTS_QUERY =
  `select p.id          as id,
          p.title       as title,
          p.description as description,
          p.price       as price,
          s.count       as count
   from products p
            left join stocks s on p.id = s.product_id`;

export class ProductRepository {

  constructor(
    private client: Client,
  ) {
  }

  getAll = async () =>
    this.client.query(ALL_PRODUCTS_QUERY)
      .then(res => res.rows);

}
