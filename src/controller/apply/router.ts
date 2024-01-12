import { Router } from 'express';
import { createApply, approveApply, rejectApply } from './controller';

const applyRouter = Router();

applyRouter.post('/', createApply);
applyRouter.put('/:applyId', approveApply);
applyRouter.patch('/:applyId', rejectApply);

export default applyRouter;
