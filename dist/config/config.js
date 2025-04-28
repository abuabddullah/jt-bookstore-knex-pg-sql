"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a config object that will hold the environment variables
const configEnv = {
    DB_HOST: process.env.DB_HOST || 'ep-fancy-sunset-a4zq98v7-pooler.us-east-1.aws.neon.tech',
    DB_USER: process.env.DB_USER || 'neondb_owner',
    DB_PASSWORD: process.env.DB_PASSWORD || 'npg_pxc5Tl0gSUwy',
    DB_NAME: process.env.DB_NAME || 'bookstore',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    NODE_ENV: process.env.NODE_ENV || 'development',
};
// Export the config object so it can be used in other files
exports.default = configEnv;
