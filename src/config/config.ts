import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  NODE_ENV: string;
}

// consolidating env vars
const configEnv: IConfig = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'localhost',
  DB_PASSWORD: process.env.DB_PASSWORD || 'localhost',
  DB_NAME: process.env.DB_NAME || 'bookstore',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Export the config object so it can be used in other files
export default configEnv;
