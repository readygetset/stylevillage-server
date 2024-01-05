import { Router } from 'express';
import userRouter from './user/router';
import authRouter from './auth/router';
import clothesRouter from './clothes/router';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/clothes', clothesRouter);

export default router;
