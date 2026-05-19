import { Request, Response } from 'express';
import { db } from '@repo/db';

export const getDeitiesByTemple = async (req: Request, res: Response): Promise<void> => {
  try {
    const deities = await db.deity.findMany({ where: { templeId: req.params['templeId'] } });
    res.json({ success: true, data: deities });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch deities' });
  }
};
