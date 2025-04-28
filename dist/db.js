"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const config_1 = __importDefault(require("./config/config"));
const environment = config_1.default.NODE_ENV || 'development';
const config = knexfile_1.default[environment];
const db = (0, knex_1.default)(config);
exports.default = db;
