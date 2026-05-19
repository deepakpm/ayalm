import { Router } from 'express';
import { getDeitiesByTemple } from './deities.controller';

export const deityRouter = Router();

deityRouter.get('/temple/:templeId', getDeitiesByTemple);
