import { Router } from 'express';
import { getOfferingsByTemple } from './offerings.controller';

export const offeringRouter = Router();

offeringRouter.get('/temple/:templeId', getOfferingsByTemple);
