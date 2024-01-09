import { Router } from 'express';
import { approveApply } from './controller';

const lendRouter = Router();

lendRouter.put('/:applyId', approveApply);

export default lendRouter;
