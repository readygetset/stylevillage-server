import { Router } from 'express';
import { createClothes, getClothes, modifyClothes } from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);
clothesRouter.put('/:clothesId', modifyClothes);
clothesRouter.get('/:clothesId', getClothes);

export default clothesRouter;
