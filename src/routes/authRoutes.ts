import express from 'express';
import { getMe, login, signup } from '../controllers/authController';
import { validateUser } from '../middleware/validationMiddleware';
import { loginLimiter } from '../middleware/rateLimiter';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/me', protect, getMe)
  .post('/signup', signup)
  .post('/login', loginLimiter, validateUser, login);

export default router;
