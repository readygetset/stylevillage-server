// import { createClothes } from './controller';
// 진짜 말이 안되는건데, 위의 주석을 지우면 clothes/controller.ts는 모듈이 아니라는 에러가 뜹니다..

import { Router } from 'express';
import { createClothes } from './controller';

const clothesRouter = Router();

clothesRouter.post('/', createClothes);

export default clothesRouter;
