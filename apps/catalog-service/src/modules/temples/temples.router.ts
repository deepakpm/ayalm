import { Router } from 'express';
import { getMostPopularTemples, getTempleBySlug } from './temples.controller';

export const templeRouter = Router();

templeRouter.get('/most-popular', getMostPopularTemples);
templeRouter.get('/slug/:slug', getTempleBySlug);
