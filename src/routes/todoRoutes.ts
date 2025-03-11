import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo as any);
router.put('/:id', updateTodo as any);
router.delete('/:id', deleteTodo as any);

export default router;
