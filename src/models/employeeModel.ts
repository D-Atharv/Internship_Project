import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  image?: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  createDate: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  createDate: { type: Date, default: Date.now },
});

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
