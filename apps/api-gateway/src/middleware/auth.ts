import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET ?? 'secret') as {
      id: string;
      email: string;
      role: string;
    };
    req.user = decoded;
    // Forward user info to downstream services via headers
    req.headers['x-user-id'] = decoded.id;
    req.headers['x-user-role'] = decoded.role;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
  }
};
