import { RequestHandler } from 'express';
import GetClothesReq from '../../type/clothes/getClothes.req';
import GetClothesRes from '../../type/clothes/getClothes.res';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import ClothesService from '../../service/clothes.service';
import CreateClothesReq from '../../type/clothes/createClothes.req';
import LoginUser from '../../type/user/loginUser';
import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';
import ModifyClothesReq from '../../type/clothes/modifyClothes.req';
import isInEnum from '../../util/isInEnum';
import DefaultRes from '../../type/default.res';

export const createClothes: RequestHandler = async (req, res, next) => {
  try {
    const { closet, category, season, status, isOpen, name, tag, image } =
      req.body;
    const user = req.user as LoginUser;

    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    if (!name) {
      throw new BadRequestError('name are essential');
    }

    if (category && !isInEnum(category, Category)) {
      throw new BadRequestError(`${category} is not in ${Category}`);
    }
    if (season && !isInEnum(season, Season)) {
      throw new BadRequestError(`${season} is not in ${Season}`);
    }
    if (status && !isInEnum(status, Status)) {
      throw new BadRequestError(`${status} is not in ${Status}`);
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

    await ClothesService.createClothes(clothesInfo, user.id);

    const message: DefaultRes = { message: '옷 정보가 등록되었습니다.' };
    res.json(message);
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
    const user = req.user as LoginUser;

    const getClothesRes: GetClothesRes = await ClothesService.getClothes(
      ClothesId,
      req.user ? user.id : null,
    );

    res.json(getClothesRes);
  } catch (error) {
    next(error);
  }
};

export const modifyClothes: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.clothesId);
    const { closet, category, season, status, isOpen, name, tag, image } =
      req.body;
    const user = req.user as LoginUser;

    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    if (
      !closet &&
      !category &&
      !season &&
      !status &&
      !isOpen &&
      !name &&
      !tag &&
      !image
    ) {
      throw new BadRequestError('수정할 항목을 입력해주세요.');
    }

    if (category && !isInEnum(category, Category)) {
      throw new BadRequestError(`${category} is not in ${Category}`);
    }
    if (season && !isInEnum(season, Season)) {
      throw new BadRequestError(`${season} is not in ${Season}`);
    }
    if (status && !isInEnum(status, Status)) {
      throw new BadRequestError(`${status} is not in ${Status}`);
    }

    const clothesId: number = id;
    const modifyClothesReq: ModifyClothesReq = {
      closet,
      category,
      season,
      status,
      isOpen,
      name,
      tag,
      image,
    };

    await ClothesService.modifyClothes(user.id, clothesId, modifyClothesReq);

    const message: DefaultRes = { message: '옷 정보가 수정되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteClothes: RequestHandler = async (req, res, next) => {
  try {
    const clothesId = Number(req.params.clothesId);
    const user = req.user as LoginUser;

    if (!user) throw new UnauthorizedError('로그인이 필요한 기능입니다.');

    await ClothesService.deleteClothes(clothesId, user.id);

    const message: DefaultRes = {
      message: '옷이 삭제되었습니다.',
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
