import db from '../db';
import { Book, BookWithAuthor } from '../types';
import { queryWithFeatures } from '../utils/queryWithFeatures';

export async function getAllBooks(options: any): Promise<any> {
  const baseQuery = db('books')
    .select(
      'books.*',
      db.raw("json_build_object('id', authors.id, 'name', authors.name) as author")
    )
    .join('authors', 'books.author_id', 'authors.id');

  return queryWithFeatures(baseQuery, {
    page: options.page ? parseInt(options.page) : undefined,
    limit: options.limit ? parseInt(options.limit) : undefined,
    search: options.search,
    searchColumns: ['books.title'],
    fields: options.fields?.split(','),
    sortBy: options.sortBy,
    sortOrder: options.sortOrder,
    filters: {
      author_id: options.author
    }
  });
}

export async function getBookById(id: number): Promise<BookWithAuthor | null> {
  const book = await db('books')
    .select(
      'books.*',
      db.raw(
        "json_build_object('id', authors.id, 'name', authors.name, 'bio', authors.bio, 'birthdate', authors.birthdate) as author",
      ),
    )
    .join('authors', 'books.author_id', 'authors.id')
    .where('books.id', id)
    .first();

  return book || null;
}

export async function createBook(book: Book): Promise<Book> {
  const [newBook] = await db('books').insert(book).returning('*');
  return newBook;
}

export async function updateBook(id: number, book: Partial<Book>): Promise<Book | null> {
  const [updatedBook] = await db('books')
    .where({ id })
    .update({ ...book, updated_at: new Date() })
    .returning('*');

  return updatedBook || null;
}

export async function deleteBook(id: number): Promise<boolean> {
  const deleted = await db('books').where({ id }).del();
  return deleted > 0;
}

export async function authorExists(authorId: number): Promise<boolean> {
  const author = await db('authors').where({ id: authorId }).first();
  return !!author;
}
