import express from 'express';
import { login, signup } from '../controllers/authController';
import { validateUser } from '../middleware/validationMiddleware';
import { loginLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', loginLimiter, validateUser, login);

export default router;
