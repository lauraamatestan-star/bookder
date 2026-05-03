// filepath: server/routes/bookRoutes.js
import { Router } from 'express';
import { getBooks, getBookById, createBook, deleteBook } from '../controllers/bookController.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.delete('/:id', deleteBook);

export default router;