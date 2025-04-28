"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.authorExists = authorExists;
const db_1 = __importDefault(require("../db"));
async function getAllBooks(authorId) {
    const query = (0, db_1.default)('books')
        .select('books.*', db_1.default.raw("json_build_object('id', authors.id, 'name', authors.name) as author"))
        .join('authors', 'books.author_id', 'authors.id');
    if (authorId) {
        query.where({ author_id: authorId });
    }
    return query;
}
async function getBookById(id) {
    const book = await (0, db_1.default)('books')
        .select('books.*', db_1.default.raw("json_build_object('id', authors.id, 'name', authors.name, 'bio', authors.bio, 'birthdate', authors.birthdate) as author"))
        .join('authors', 'books.author_id', 'authors.id')
        .where('books.id', id)
        .first();
    return book || null;
}
async function createBook(book) {
    const [newBook] = await (0, db_1.default)('books').insert(book).returning('*');
    return newBook;
}
async function updateBook(id, book) {
    const [updatedBook] = await (0, db_1.default)('books')
        .where({ id })
        .update({ ...book, updated_at: new Date() })
        .returning('*');
    return updatedBook || null;
}
async function deleteBook(id) {
    const deleted = await (0, db_1.default)('books').where({ id }).del();
    return deleted > 0;
}
async function authorExists(authorId) {
    const author = await (0, db_1.default)('authors').where({ id: authorId }).first();
    return !!author;
}
