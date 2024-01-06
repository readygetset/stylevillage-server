import { Router } from 'express';
import userRouter from './user/router';
import authRouter from './auth/router';
import closetRouter from './closet/router';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/closet', closetRouter);

export default router;
