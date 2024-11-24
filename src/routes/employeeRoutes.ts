import express from 'express';
import { createEmployee, getEmployees,updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { protect } from '../middleware/authMiddleware';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = express.Router();

router
  .post('/', protect, createEmployee)
  .get('/', protect, cacheMiddleware(60), getEmployees)
  .put('/:id', protect,updateEmployee)
  .delete('/:id',protect, deleteEmployee)

export default router;
