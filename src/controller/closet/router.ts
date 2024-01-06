import { Router } from 'express';
import { postCloset } from './controller';

const closetRouter = Router();

closetRouter.post('/', postCloset);

export default closetRouter;
