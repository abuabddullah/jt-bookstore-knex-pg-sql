import { Router } from 'express';
import * as bookController from '../controllers/bookController';

import { createBookSchema, updateBookSchema, validateRequest } from '../middleware/validation';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post(
  '/',
  validateRequest(createBookSchema, { checkAuthorExists: true }),
  bookController.createBook,
);
router.put(
  '/:id',
  validateRequest(updateBookSchema, { checkAuthorExists: true }),
  bookController.updateBook,
);
router.delete('/:id', bookController.deleteBook);

export default router;
