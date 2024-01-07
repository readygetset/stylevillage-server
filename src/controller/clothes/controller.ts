import { RequestHandler } from 'express';
import GetClothesReq from '../../type/getClothes/getClothes.req';
import GetClothesRes from '../../type/getClothes/getClothes.res';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import ClothesService from '../../service/clothes.service';
import CreateClothesReq from '../../type/clothes/createClothes.req';
import CreateClothesRes from '../../type/clothes/createClothes.res';
import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';

export const createClothes: RequestHandler = async (req, res, next) => {
  try {
    const { closet, category, season, status, isOpen, name, tag, image } =
      req.body;

    if (!req.user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    if (!closet || !name) {
      throw new BadRequestError('closet,name are essential');
    }

    //Todo 유효성 검사 기능 분리
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
      isOpen,
      name,
      tag,
      image,
    };

    await ClothesService.createClothes(clothesInfo);

    const creaetClothesRes: CreateClothesRes = { isSuccess: true };
    res.json(creaetClothesRes);
  } catch (error) {
    console.log('error in createClothes :', error);
    next(error);
  }
};

export const getClothes: RequestHandler = async (req, res, next) => {
  try {
    const clothesId = Number(req.params.clothesId);

    if (!clothesId) throw new BadRequestError('ClothesId is required.');

    const ClothesId: GetClothesReq = { clothesId };

    const getClothesRes: GetClothesRes = await ClothesService.getClothes(
      ClothesId,
      req.user ? req.user.id : null,
    );

    res.json(getClothesRes);
  } catch (error) {
    next(error);
  }
};
