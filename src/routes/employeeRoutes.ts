import express from 'express';
import { createEmployee, getEmployees } from '../controllers/employeeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, (req, res) => {
  createEmployee(req, res);
});

router.get('/', protect, (req, res) => {
  getEmployees(req, res);
});

export default router;
