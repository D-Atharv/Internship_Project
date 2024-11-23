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


export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 
    const { name, email, mobile, designation, gender, courses } = req.body;

    const parsedCourses = typeof courses === "string" ? JSON.parse(courses) : courses;

    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(mobile && { mobile }),
      ...(designation && { designation }),
      ...(gender && { gender }),
      ...(parsedCourses && { course: parsedCourses }),
    };

    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
