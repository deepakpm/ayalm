import { Router } from 'express';
import { getUpcomingEvents, getEventsByTemple } from './events.controller';

export const eventRouter = Router();

eventRouter.get('/', getUpcomingEvents);
eventRouter.get('/temple/:templeId', getEventsByTemple);
