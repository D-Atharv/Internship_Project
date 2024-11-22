import { Request, Response } from 'express';
import { User, IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler';

const generateToken = (id: string): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY as string;
  return jwt.sign({ id }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '15m',
  });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ message: 'Username or email already exists' });
      return;
    }

    const newUser: IUser = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(newUser._id as string);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id as string);

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
