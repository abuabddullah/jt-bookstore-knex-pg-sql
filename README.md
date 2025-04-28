# Bookstore API

A RESTful API for a bookstore built with TypeScript, Express, Knex, and PostgreSQL.

## Features

- Authors CRUD operations
- Books CRUD operations
- Book filtering by author
- Detailed view for books including author information
- Detailed view for authors including their books
- Input validation using Joi
- Error handling with appropriate HTTP status codes

## Github link
https://github.com/abuabddullah/jt-bookstore-knex-pg-sql.git

## Testing with Postman

Import the included  <a href="https://github.com/abuabddullah/jt-bookstore-knex-pg-sql/blob/main/bookstore-knexPGexpress.postman_collection.json" target="_blank">`bookstore-knexPGexpress.postman_collection.json`</a> file into Postman to test all API endpoints.

## SQL file

<a href="https://github.com/abuabddullah/jt-bookstore-knex-pg-sql/blob/main/schema.sql" target="_blank">`schema.sql`</a>

## Migration files
- <a href="https://github.com/abuabddullah/jt-bookstore-knex-pg-sql/blob/main/src/migrations/20230101000001_create_books_table.ts" target="_blank">`20230101000001_create_books_table`</a>
- <a href="https://github.com/abuabddullah/jt-bookstore-knex-pg-sql/blob/main/src/migrations/20230101000000_create_authors_table.ts" target="_blank">`20230101000000_create_authors_table`</a>

## Env vars

```
DB_HOST=ep-fancy-sunset-a4zq98v7-pooler.us-east-1.aws.neon.tech
DB_USER=neondb_owner
DB_PASSWORD=npg_pxc5Tl0gSUwy
DB_NAME=bookstore
DB_PORT=5432
NODE_ENV=development
```
## Tech Stack

- Express
- Knex
- PostgreSQL
- Typescript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abuabddullah/jt-bookstore-knex-pg-sql.git
cd jt-bookstore-knex-pg-sql
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file & Update the `.env` file with your PostgreSQL connection details:

```
DB_HOST=ep-fancy-sunset-a4zq98v7-pooler.us-east-1.aws.neon.tech
DB_USER=neondb_owner
DB_PASSWORD=npg_pxc5Tl0gSUwy
DB_NAME=bookstore
DB_PORT=5432
NODE_ENV=development
```

5. Run migrations to create the database schema:

```bash
npm run migrate:latest
```

## Starting the Server

To start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5432`.

## API Endpoints

### Authors

- `GET /authors` - Retrieve all authors
- `GET /authors/:id` - Retrieve a specific author with their books
- `POST /authors` - Create a new author
- `PUT /authors/:id` - Update an existing author
- `DELETE /authors/:id` - Delete an author

### Books

- `GET /books` - Retrieve all books
- `GET /books?author=:authorId` - Retrieve books by a specific author
- `GET /books/:id` - Retrieve a specific book with author information
- `POST /books` - Create a new book
- `PUT /books/:id` - Update an existing book
- `DELETE /books/:id` - Delete a book

## Request/Response Examples

### Creating an Author

**Request**:

```http
POST /authors
Content-Type: application/json

{
  "name": "Jane Austen",
  "bio": "English novelist known primarily for her six major novels",
  "birthdate": "1775-12-16"
}
```

**Response**:

```json
{
  "id": 1,
  "name": "Jane Austen",
  "bio": "English novelist known primarily for her six major novels",
  "birthdate": "1775-12-16",
  "created_at": "2023-04-01T12:00:00.000Z",
  "updated_at": "2023-04-01T12:00:00.000Z"
}
```

### Creating a Book

**Request**:

```http
POST /books
Content-Type: application/json

{
  "title": "Pride and Prejudice",
  "description": "A romantic novel of manners published in 1813",
  "published_date": "1813-01-28",
  "author_id": 1
}
```

**Response**:

```json
{
  "id": 1,
  "title": "Pride and Prejudice",
  "description": "A romantic novel of manners published in 1813",
  "published_date": "1813-01-28",
  "author_id": 1,
  "created_at": "2023-04-01T12:05:00.000Z",
  "updated_at": "2023-04-01T12:05:00.000Z"
}
```


## Development Scripts

- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run ESLint to check code style
- `npm run format` - Format code with Prettier
- `npm run migrate:make [name]` - Create a new migration file
- `npm run migrate:latest` - Run all migrations
- `npm run migrate:rollback` - Rollback the last migration
