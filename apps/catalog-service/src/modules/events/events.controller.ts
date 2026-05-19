import { Request, Response } from 'express';
import { db } from '@repo/db';

export const getUpcomingEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await db.event.findMany({
      where: { startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
      include: { temple: { select: { translations: { select: { name: true } }, slug: true } } },
    });
    res.json({ success: true, data: events });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
};

export const getEventsByTemple = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await db.event.findMany({
      where: { templeId: req.params['templeId'], startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
    });
    res.json({ success: true, data: events });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
};
