import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'bookstore',
      port: Number(process.env.PORT) || 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.PORT) || 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './dist/migrations',
      extension: 'js',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
