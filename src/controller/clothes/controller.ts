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

    if (!closet || !name) {
      throw new BadRequestError('closet,name are essential');
    }

    //Enum fields 유효성 검사
    if (category) {
      if (!Object.values(Category).includes(category))
        throw new BadRequestError('category is not valid');
    }
    if (season) {
      if (!Object.values(Season).includes(season))
        throw new BadRequestError('season is not valid');
    }
    if (status) {
      if (!Object.values(Status).includes(status))
        throw new BadRequestError('status is not valid');
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
