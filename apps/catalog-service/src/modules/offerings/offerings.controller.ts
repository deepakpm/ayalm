import { Request, Response } from 'express';
import { db } from '@repo/db';

export const getOfferingsByTemple = async (req: Request, res: Response): Promise<void> => {
  try {
    const offerings = await db.offering.findMany({
      where: { templeId: req.params['templeId'], isAvailable: true },
    });
    res.json({ success: true, data: offerings });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch offerings' });
  }
};
