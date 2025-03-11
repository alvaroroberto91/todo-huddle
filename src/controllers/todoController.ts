import { Request, Response } from 'express';
import Todo from '../models/todoModels';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving TODOs', error });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, priority, dueDate } = req.body;

  try {
    const existingTodo = await Todo.findOne({ title });
    if (existingTodo) {
      return res.status(400).json({ message: 'A TODO with this title already exists' });
    }

    const newTodo = new Todo({ title, description, priority, dueDate });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating TODO', error });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return res.status(404).json({ message: 'TODO not found' });
    }

    if (title && title !== existingTodo.title) {
      const todoWithSameTitle = await Todo.findOne({ title });
      if (todoWithSameTitle) {
        return res.status(400).json({ message: 'A TODO with this title already exists' });
      }
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        priority,
        dueDate,
        completed,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data provided', error: error.message });
    }
    return res.status(500).json({ message: 'Error updating TODO', error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' });
    }
    res.status(200).json({ message: 'TODO deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting TODO', error });
  }
};
