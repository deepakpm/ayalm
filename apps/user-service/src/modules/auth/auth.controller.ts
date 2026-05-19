import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@repo/db';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-in-production';
const JWT_EXPIRES_IN = '7d';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signToken = (user: { id: string; email: string; role: string }) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, error: parsed.error.flatten() }); return; }

    const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) { res.status(409).json({ success: false, error: 'Email already registered' }); return; }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await db.user.create({
      data: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, passwordHash },
      select: { id: true, name: true, email: true, role: true },
    });

    res.status(201).json({ success: true, data: { user, accessToken: signToken(user) } });
  } catch {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, error: parsed.error.flatten() }); return; }

    const user = await db.user.findUnique({ where: { email: parsed.data.email } });
    if (!user?.passwordHash) { res.status(401).json({ success: false, error: 'Invalid credentials' }); return; }

    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) { res.status(401).json({ success: false, error: 'Invalid credentials' }); return; }

    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        accessToken: signToken(user),
      },
    });
  } catch {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body as { token: string };
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    res.json({ success: true, data: { accessToken: signToken(decoded) } });
  } catch {
    res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
};
