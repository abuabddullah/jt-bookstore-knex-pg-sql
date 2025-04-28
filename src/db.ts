import knex from 'knex';
import knexConfig from './knexfile';
import configEnv from './config/config';

const environment = configEnv.NODE_ENV || 'development';
const config = knexConfig[environment];

const db = knex(config);

export default db;
