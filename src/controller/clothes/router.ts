import { Router } from 'express';
import { createClothes } from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);

export default clothesRouter;
