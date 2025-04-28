import { Request, Response } from 'express';
import * as authorService from '../services/authorService';

export async function getAllAuthors(req: Request, res: Response) {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
}

export async function getAuthorById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }
    const author = await authorService.getAuthorById(id);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
}

export async function createAuthor(req: Request, res: Response) {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Failed to create author' });
  }
}

export async function updateAuthor(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const updatedAuthor = await authorService.updateAuthor(id, req.body);

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(updatedAuthor);
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Failed to update author' });
  }
}

export async function deleteAuthor(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const deleted = await authorService.deleteAuthor(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(204).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Failed to delete author' });
  }
}
