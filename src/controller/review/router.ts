import { Router } from 'express';
import { modifyReview } from './controller';

const reviewRouter = Router();

reviewRouter.put('/:lendId', modifyReview);

export default reviewRouter;
