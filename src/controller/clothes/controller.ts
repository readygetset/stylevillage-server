import { RequestHandler } from 'express';
import ClothesService from '../../service/clothes.service';
import CreateClothesReq from '../../type/clothes/createClothes.req';
import CreateClothesRes from '../../type/clothes/createClothes.res';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';
import ModifyClothesReq from '../../type/clothes/modifyClothes.req';
import ModifyClothesRes from '../../type/clothes/modifyClothes.res';

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

export const modifyClothes: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.clothesId);
    const clothesInfo = req.body;

    if (!req.user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    if (!clothesInfo) {
      throw new BadRequestError('수정할 항목을 입력해주세요.');
    }

    const clothesId: number = id;
    const modifyClothesReq: ModifyClothesReq = clothesInfo;

    await ClothesService.modifyClothes(clothesId, modifyClothesReq);

    const modifyClothesRes: ModifyClothesRes = { isSuccess: true };
    res.json(modifyClothesRes);
  } catch (error) {
    next(error);
  }
};
