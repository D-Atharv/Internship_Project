import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import { generalLimiter } from './middleware/rateLimiter';
import winston from 'winston';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

app
    .use(cors())
    .use(helmet())
    .use(express.json())
    .use(cookieParser())
    .use(generalLimiter);

app
    .use('/api/auth', authRoutes)
    .use('/api/employees', employeeRoutes);

app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
