import { RequestHandler } from 'express';
import ClothesService from '../../service/clothes.service';
import CreateClothesReq from '../../type/clothes/createClothes.req';
import CreaetClothesRes from '../../type/clothes/createClothes.res';
import { BadRequestError } from '../../util/customErrors';
import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';

export const createClothes: RequestHandler = async (req, res, next) => {
  try {
    const { closet, category, season, status, is_open, name, tag, image } =
      req.body;

    if (!req.user) {
      res.status(401).json({ error: '로그인이 필요한 기능입니다.' });
      return;
    }

    if (!closet || !name) {
      throw new BadRequestError('closet,name are essential');
    }

    //Enum fields 유효성 검사
    if (category) {
      if (!Object.values(Category).includes(category))
        throw new BadRequestError('category is invalid');
    }
    if (season) {
      if (!Object.values(Season).includes(season))
        throw new BadRequestError('season is invalid');
    }
    if (status) {
      if (!Object.values(Status).includes(status))
        throw new BadRequestError('status is invalid');
    }

    const clothesInfo: CreateClothesReq = {
      closet,
      category,
      season,
      status,
      is_open,
      name,
      tag,
      image,
    };

    await ClothesService.createClothes(clothesInfo);

    const creaetClothesRes: CreaetClothesRes = { isSuccess: true };
    res.json(creaetClothesRes);
  } catch (error) {
    console.log('error in createClothes :', error);
    next(error);
  }
};
