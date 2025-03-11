import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
