import { Router } from 'express';
import {
  createClothes,
  getClothes,
  modifyClothes,
  deleteClothes,
  getWishList,
} from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);
clothesRouter.put('/:clothesId', modifyClothes);
clothesRouter.get('/:clothesId', getClothes);
clothesRouter.delete('/:clothesId', deleteClothes);
clothesRouter.get('/', getWishList);

export default clothesRouter;
