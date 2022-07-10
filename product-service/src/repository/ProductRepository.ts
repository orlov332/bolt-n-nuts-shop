import { Client } from 'pg';
import * as uuid from 'uuid';

const ALL_PRODUCTS_QUERY =
  `select p.id          as id,
          p.title       as title,
          p.description as description,
          p.price       as price,
          s.count       as count
   from products p
            left join stocks s on p.id = s.product_id`;

const PRODUCT_BY_ID_QUERY = `${ ALL_PRODUCTS_QUERY } where p.id = $1`;

export class ProductRepository {

  constructor(
    private client: Client,
  ) {
  }

  async getAll() {
    return this.client.query(ALL_PRODUCTS_QUERY)
      .then(res => res.rows);
  }

  async getById(id: string) {
    return this.client.query(PRODUCT_BY_ID_QUERY, [ id ])
      .then(res => res.rows[0]);
  }

  async addNew({
                 id = uuid.v4(),
                 title,
                 description = undefined,
                 price = undefined,
                 count = undefined,
               }) {
    try {
      await this.client.query('BEGIN');

      await this.client.query(
        `insert into products (id, title, description, price)
         values ($1, $2, $3, $4)`,
        [ id, title, description, price ]);
      if (count)
        await this.client.query(
          `insert into stocks (product_id, count)
           values ($1, $2)`,
          [ id, count ]);

      await this.client.query('COMMIT');
      return { id, title, description, price, count };
    } catch (e) {
      await this.client.query('ROLLBACK');
      throw e;
    }
  }
}
