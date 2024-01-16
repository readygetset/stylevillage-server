import { Router } from 'express';
import {
  createApply,
  approveApply,
  rejectApply,
  getArrivedApply,
} from './controller';

const applyRouter = Router();

applyRouter.post('/', createApply);
applyRouter.put('/:applyId', approveApply);
applyRouter.patch('/:applyId', rejectApply);
applyRouter.get('/', getArrivedApply);

export default applyRouter;
