import express from 'express';
import { createEmployee, getEmployees } from '../controllers/employeeController';
import { protect } from '../middleware/authMiddleware';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = express.Router();

router
  .post('/', protect, createEmployee)
  .get('/', protect, cacheMiddleware(60), getEmployees);

export default router;
