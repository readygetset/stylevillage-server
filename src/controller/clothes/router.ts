import { Router } from 'express';
import { getClothes, createClothes } from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);
clothesRouter.get('/:clothesId', getClothes);

export default clothesRouter;
