import { Router } from 'express';
import { approveApply, rejectApply } from './controller';

const lendRouter = Router();

lendRouter.put('/:applyId', approveApply);
lendRouter.patch('/:applyId', rejectApply);

export default lendRouter;
