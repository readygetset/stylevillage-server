import { Router } from 'express';
import { approveApply, getMyLends, rejectApply } from './controller';

const lendRouter = Router();

lendRouter.put('/:applyId', approveApply);
lendRouter.patch('/:applyId', rejectApply);
lendRouter.get('/', getMyLends);

export default lendRouter;
