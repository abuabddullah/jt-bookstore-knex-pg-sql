"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAuthors = getAllAuthors;
exports.getAuthorById = getAuthorById;
exports.createAuthor = createAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
const db_1 = __importDefault(require("../db"));
async function getAllAuthors() {
    return (0, db_1.default)('authors').select('*');
}
async function getAuthorById(id) {
    const author = await (0, db_1.default)('authors').where({ id }).first();
    if (!author) {
        return null;
    }
    const books = await (0, db_1.default)('books').where({ author_id: id });
    return {
        ...author,
        books,
    };
}
async function createAuthor(author) {
    const [newAuthor] = await (0, db_1.default)('authors').insert(author).returning('*');
    return newAuthor;
}
async function updateAuthor(id, author) {
    const [updatedAuthor] = await (0, db_1.default)('authors')
        .where({ id })
        .update({ ...author, updated_at: new Date() })
        .returning('*');
    return updatedAuthor || null;
}
async function deleteAuthor(id) {
    const deleted = await (0, db_1.default)('authors').where({ id }).del();
    return deleted > 0;
}
