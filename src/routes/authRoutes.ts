import express from 'express';
import { login, logout, signup } from '../controllers/authController';
import { validateUser } from '../middleware/validationMiddleware';

const router = express.Router();

router
    .post('/signup', signup)
    .post('/login', validateUser, login)
    .post('/logout', logout);

export default router;
