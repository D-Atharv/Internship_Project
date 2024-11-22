import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: 'Too many login attempts from this IP, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false, 
});

export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
