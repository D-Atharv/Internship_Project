import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

const verifyToken = (token: string): JwtPayload => {
  const publicKey = process.env.JWT_PUBLIC_KEY as string;
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;
};

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    (req as Request & { user: string }).user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
