import { Router } from 'express';
import { createWish, deleteWish } from './controller';

const wishRouter = Router();

wishRouter.post('/:clothesId', createWish);
wishRouter.put('/:clothesId', deleteWish);

export default wishRouter;
