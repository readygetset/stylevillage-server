import { Router } from 'express';
import { createClothes, modifyClothes } from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);
clothesRouter.put('/:clothesId', modifyClothes);

export default clothesRouter;
