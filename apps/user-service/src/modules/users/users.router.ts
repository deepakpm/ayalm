import { Router } from 'express';
import { getMe, updateProfile } from './users.controller';

export const userRouter = Router();

userRouter.get('/me', getMe);
userRouter.patch('/me', updateProfile);
