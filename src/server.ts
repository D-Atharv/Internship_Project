import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 5000;

connectDB();

app
    .use(cors())
    .use(helmet())
    .use(express.json())
    .use(cookieParser());

app
    .use('/api/auth', authRoutes)
    .use('/api/employees', employeeRoutes);
    

app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

