import { Router } from 'express';
import {
  login,
  register,
  changePassword,
  getProfile,
  updateProfile,
} from './controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.put('/profile', changePassword);
authRouter.get('/profile', getProfile);
authRouter.post('/profile', updateProfile);
export default authRouter;
