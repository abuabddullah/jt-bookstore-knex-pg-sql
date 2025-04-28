
import { Knex } from 'knex';

import configEnv from './config/config';


console.log('Loaded Environment Variables:', {
  host: configEnv.DB_HOST,
  user: configEnv.DB_USER,
  db: configEnv.DB_NAME,
  port: configEnv.DB_PORT,
  ssl: { rejectUnauthorized: false },
});


const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: configEnv.DB_HOST || 'localhost',
      user: configEnv.DB_USER || 'postgres',
      password: configEnv.DB_PASSWORD || 'postgres',
      database: configEnv.DB_NAME || 'bookstore',
      port: Number(configEnv.DB_PORT) || 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: 'migrations',
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
      host: configEnv.DB_HOST,
      user: configEnv.DB_USER,
      password: configEnv.DB_PASSWORD,
      database: configEnv.DB_NAME,
      port: Number(configEnv.DB_PORT) || 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: 'migrations',
      extension: 'js',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
console.log("Knex DB connection config:", config.development.connection);
export default config;
module.exports = config;
