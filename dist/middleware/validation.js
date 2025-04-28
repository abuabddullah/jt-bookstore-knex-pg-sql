"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.updateBookSchema = exports.createBookSchema = exports.updateAuthorSchema = exports.createAuthorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bookService_1 = require("../services/bookService");
// authorSchema for creation (all required)
exports.createAuthorSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    }),
    bio: joi_1.default.string().allow(null, ''),
    birthdate: joi_1.default.date().required().messages({
        'date.base': 'Birthdate must be a valid date',
        'any.required': 'Birthdate is required',
    }),
});
// authorSchema for updates (all optional)
exports.updateAuthorSchema = joi_1.default.object({
    name: joi_1.default.string().messages({
        'string.empty': 'Name cannot be empty',
    }),
    bio: joi_1.default.string().allow(null, ''),
    birthdate: joi_1.default.date().messages({
        'date.base': 'Birthdate must be a valid date',
    }),
});
exports.createBookSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    description: joi_1.default.string().allow(null, ''),
    published_date: joi_1.default.date().required().messages({
        'date.base': 'Published date must be a valid date',
        'any.required': 'Published date is required',
    }),
    author_id: joi_1.default.number().integer().required().messages({
        'number.base': 'Author ID must be a number',
        'any.required': 'Author ID is required',
    }),
});
exports.updateBookSchema = joi_1.default.object({
    title: joi_1.default.string().messages({
        'string.empty': 'Title cannot be empty',
    }),
    description: joi_1.default.string().allow(null, ''),
    published_date: joi_1.default.date().messages({
        'date.base': 'Published date must be a valid date',
    }),
    author_id: joi_1.default.number().integer().messages({
        'number.base': 'Author ID must be a number',
    }),
});
const validateRequest = (schema, options = {}) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        if (options.checkAuthorExists && req.body.author_id !== undefined) {
            const exists = await (0, bookService_1.authorExists)(req.body.author_id);
            if (!exists) {
                return res.status(400).json({ errors: ['Author with the provided ID does not exist'] });
            }
        }
        next();
    };
};
exports.validateRequest = validateRequest;
