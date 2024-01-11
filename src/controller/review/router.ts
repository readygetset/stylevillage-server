import { Router } from 'express';
import { deleteReview } from './controller';

const reviewRouter = Router();

reviewRouter.delete('/:lendId', deleteReview);

export default reviewRouter;
