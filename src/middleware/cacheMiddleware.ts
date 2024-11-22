import { Request, Response, NextFunction } from "express";

const cache = new Map<string, any>();

export const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.originalUrl;

    // Check if the response for this key exists in the cache
    if (cache.has(key)) {
      const cachedResponse = cache.get(key);
      res.status(200).send(cachedResponse); // Send the cached response
      return; // End the middleware execution
    }

    // Override res.send to cache the response
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response => {
      cache.set(key, body); // Store the response in the cache
      setTimeout(() => cache.delete(key), duration * 1000); // Clear the cache after the duration
      return originalSend(body); // Send the response
    };

    next(); // Call the next middleware or route handler
  };
};
