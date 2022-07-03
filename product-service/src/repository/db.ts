import { Client, ClientConfig } from 'pg';

const config: ClientConfig = {
  host: process.env.POSTGRESQL_HOST,
  port: Number.parseInt(process.env.POSTGRESQL_PORT),
  database: process.env.POSTGRESQL_DB_NAME,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
};

export function getDbConnection(): Client {
  return new Client(config);
}
