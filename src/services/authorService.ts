import db from '../db';
import { Author, AuthorWithBooks } from '../types';
import { queryWithFeatures } from '../utils/queryWithFeatures';

export async function getAllAuthors(options: any): Promise<any> {
  const baseQuery = db('authors').select('*');

  return queryWithFeatures(baseQuery, {
    page: options.page ? parseInt(options.page) : undefined,
    limit: options.limit ? parseInt(options.limit) : undefined,
    search: options.search,
    searchColumns: ['name'],
    fields: options.fields?.split(','),
    sortBy: options.sortBy,
    sortOrder: options.sortOrder,
    filters: {}
  });
}

export async function getAuthorById(id: number): Promise<AuthorWithBooks | null> {
  const author = await db('authors').where({ id }).first();

  if (!author) {
    return null;
  }

  const books = await db('books').where({ author_id: id });

  return {
    ...author,
    books,
  };
}

export async function createAuthor(author: Author): Promise<Author> {
  const [newAuthor] = await db('authors').insert(author).returning('*');
  return newAuthor;
}

export async function updateAuthor(id: number, author: Partial<Author>): Promise<Author | null> {
  const [updatedAuthor] = await db('authors')
    .where({ id })
    .update({ ...author, updated_at: new Date() })
    .returning('*');

  return updatedAuthor || null;
}

export async function deleteAuthor(id: number): Promise<boolean> {
  const deleted = await db('authors').where({ id }).del();
  return deleted > 0;
}
