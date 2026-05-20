import { Router } from 'express';
import { getHomeConfig } from './config.controller';

const router = Router();

router.get('/home', getHomeConfig);

export default router;
