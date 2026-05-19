import { Router } from 'express';
import { getAllTemples, getMostPopularTemples, getTempleBySlug } from './temples.controller';

export const templeRouter = Router();

templeRouter.get('/', getAllTemples);
templeRouter.get('/most-popular', getMostPopularTemples);
templeRouter.get('/slug/:slug', getTempleBySlug);
