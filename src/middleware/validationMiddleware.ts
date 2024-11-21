import { Request, Response, NextFunction } from 'express';

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;
    const errors: { field: string; message: string }[] = [];

    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push({ field: 'username', message: 'Username must be alphanumeric' });
    }

    if (!password || password.length < 8) {
        errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    next();
};
