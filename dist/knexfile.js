"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
console.log('Loaded Environment Variables:', {
    host: config_1.default.DB_HOST,
    user: config_1.default.DB_USER,
    db: config_1.default.DB_NAME,
    port: config_1.default.DB_PORT,
    ssl: { rejectUnauthorized: false },
});
const config = {
    development: {
        client: 'pg',
        connection: {
            host: config_1.default.DB_HOST || 'localhost',
            user: config_1.default.DB_USER || 'postgres',
            password: config_1.default.DB_PASSWORD || 'postgres',
            database: config_1.default.DB_NAME || 'bookstore',
            port: Number(config_1.default.DB_PORT) || 5432,
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
            host: config_1.default.DB_HOST,
            user: config_1.default.DB_USER,
            password: config_1.default.DB_PASSWORD,
            database: config_1.default.DB_NAME,
            port: Number(config_1.default.DB_PORT) || 5432,
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
exports.default = config;
module.exports = config;
