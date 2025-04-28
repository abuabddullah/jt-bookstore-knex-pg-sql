import { Router } from 'express';
import * as authorController from '../controllers/authorController';
import { createAuthorSchema, updateAuthorSchema, validateRequest } from '../middleware/validation';

const router = Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.post('/', validateRequest(createAuthorSchema), authorController.createAuthor);
router.put('/:id', validateRequest(updateAuthorSchema), authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

export default router;
