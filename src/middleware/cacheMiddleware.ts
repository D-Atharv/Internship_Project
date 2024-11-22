import { Request, Response, NextFunction } from 'express';
import cache from 'memory-cache';

export const cacheMiddleware = (duration: number) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const key = '__express__' + req.originalUrl || req.url;
  const cachedData = cache.get(key);
  if (cachedData) {
    res.send(cachedData);
    return;
  }
  const originalSend = res.send; 
  res.send = (body: any): Response => {
    cache.put(key, body, duration * 1000);
    return originalSend(body); 
  };
  next();
};