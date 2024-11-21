import { Request, Response } from 'express';
import { Employee, IEmployee } from '../models/employeeModel';
import { errorHandler } from '../utils/errorHandler';

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee: IEmployee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees: IEmployee[] = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    errorHandler(res, error);
  }
};
