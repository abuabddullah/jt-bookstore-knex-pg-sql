"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// consolidating env vars
const configEnv = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'localhost',
    DB_PASSWORD: process.env.DB_PASSWORD || 'localhost',
    DB_NAME: process.env.DB_NAME || 'bookstore',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    NODE_ENV: process.env.NODE_ENV || 'development',
};
// Export the config object so it can be used in other files
exports.default = configEnv;
