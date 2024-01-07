import { Router } from 'express';
import { getCloset } from './controller';

const closetRouter = Router();

closetRouter.get('/:closetId', getCloset);

export default closetRouter;
