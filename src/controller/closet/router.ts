import { Router } from 'express';
import { postCloset } from './controller';

import { getCloset } from './controller';

const closetRouter = Router();

closetRouter.post('/', postCloset);
closetRouter.get('/:closetId', getCloset);

export default closetRouter;
