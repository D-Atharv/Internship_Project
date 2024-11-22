import { Request, Response } from 'express';
import { Employee, IEmployee } from '../models/employeeModel';
import multer from 'multer';

const upload = multer({ dest: "uploads/" }); //Adjust later

export const createEmployee = [
  upload.single("image"), 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, mobile, designation, gender, courses } = req.body;

      if (!name || !email || !mobile) {
         res.status(400).json({ message: "Name, email, and mobile are required." });
      }

      const parsedCourses = typeof courses === "string" ? JSON.parse(courses) : courses;

      const employee: IEmployee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course: parsedCourses,
        image: req.file ? req.file.path : undefined, 
      });


      await employee.save();

      res.status(201).json({ message: "Employee created successfully", employee });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const getEmployees = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employees: IEmployee[] = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
