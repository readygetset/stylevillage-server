import { Router } from 'express';
import { postCloset } from './controller';
import { getCloset } from './controller';
import { modifyCloset } from './controller';

const closetRouter = Router();

closetRouter.post('/', postCloset);
closetRouter.get('/:closetId', getCloset);
closetRouter.put('/:closetId', modifyCloset);

export default closetRouter;
