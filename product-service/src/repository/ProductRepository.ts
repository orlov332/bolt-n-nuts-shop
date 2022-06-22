import { Client } from 'pg';

const ALL_PRODUCTS_QUERY =
  `select p.id          as id,
          p.title       as title,
          p.description as description,
          p.price       as price,
          s.count       as count
   from products p
            left join stocks s on p.id = s.product_id`;

const PRODUCT_BY_ID_QUERY = `${ALL_PRODUCTS_QUERY} where p.id = $1`;

export class ProductRepository {

  constructor(
    private client: Client,
  ) {
  }

  getAll = async () =>
    this.client.query(ALL_PRODUCTS_QUERY)
      .then(res => res.rows);

  getById = async (id: string) =>
    this.client.query(PRODUCT_BY_ID_QUERY, [id])
      .then(res => res.rows[0]);

}
