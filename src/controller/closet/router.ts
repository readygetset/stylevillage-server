import { Router } from 'express';
import { getClosetById } from './controller';

const closetRouter = Router();

closetRouter.get('/:closetId', getClosetById);

export default closetRouter;
