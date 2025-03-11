import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || '');

    console.log('Connected to MongoDB');
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to database', err);
  }
};

startServer();
