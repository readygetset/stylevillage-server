import { Router } from 'express';
import {
  createClothes,
  getClothes,
  modifyClothes,
  deleteClothes,
} from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);
clothesRouter.put('/:clothesId', modifyClothes);
clothesRouter.get('/:clothesId', getClothes);
clothesRouter.delete('/:clothesId', deleteClothes);

export default clothesRouter;
