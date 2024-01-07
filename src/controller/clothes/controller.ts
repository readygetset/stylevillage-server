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
import ModifyClothesReq from '../../type/clothes/modifyClothes.req';
import ModifyClothesRes from '../../type/clothes/modifyClothes.res';
import isInEnum from '../../util/isInEnum';

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

    if (category) {
      if (!isInEnum(category, Object.values(Category)))
        throw new BadRequestError(`${category} is invalid`);
    }
    if (season) {
      if (!isInEnum(season, Object.values(Season)))
        throw new BadRequestError(`${season} is invalid`);
    }
    if (status) {
      if (!isInEnum(status, Object.values(Status)))
        throw new BadRequestError(`${status} is invalid`);
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

    if (clothesInfo.category) {
      if (!isInEnum(clothesInfo.category, Object.values(Category)))
        throw new BadRequestError(`${clothesInfo.category} is invalid`);
    }
    if (clothesInfo.season) {
      if (!isInEnum(clothesInfo.season, Object.values(Season)))
        throw new BadRequestError(`${clothesInfo.season} is invalid`);
    }
    if (clothesInfo.status) {
      if (!isInEnum(clothesInfo.status, Object.values(Status)))
        throw new BadRequestError(`${clothesInfo.status} is invalid`);
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
