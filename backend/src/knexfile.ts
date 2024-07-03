import { knex, type Knex } from 'knex';

const config: Knex.Config = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
};

export const db = knex(config);
