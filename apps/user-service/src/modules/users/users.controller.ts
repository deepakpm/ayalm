import { Request, Response } from 'express';
import { db } from '@repo/db';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  preferredLanguage: z.enum(['en', 'ta']).optional(),
});

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.headers['x-user-id'] as string;
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true, role: true, preferredLanguage: true, createdAt: true },
    });
    if (!user) { res.status(404).json({ success: false, error: 'User not found' }); return; }
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.headers['x-user-id'] as string;
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, error: parsed.error.flatten() }); return; }
    const user = await db.user.update({ where: { id: userId }, data: parsed.data });
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
};
