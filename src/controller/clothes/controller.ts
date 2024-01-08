import { RequestHandler } from 'express';
import GetClothesReq from '../../type/getClothes/getClothes.req';
import GetClothesRes from '../../type/getClothes/getClothes.res';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import ClothesService from '../../service/clothes.service';
import CreateClothesReq from '../../type/clothes/createClothes.req';
import CreateClothesRes from '../../type/clothes/createClothes.res';
import LoginUser from '../../type/user/loginUser';
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

    if (category && !isInEnum(category, Category)) {
      throw new BadRequestError('---');
    }
    if (season && !isInEnum(category, Season)) {
      throw new BadRequestError('---');
    }
    if (status && !isInEnum(category, Status)) {
      throw new BadRequestError('---');
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
      throw new BadRequestError('---');
    }
    if (season && !isInEnum(category, Season)) {
      throw new BadRequestError('---');
    }
    if (status && !isInEnum(category, Status)) {
      throw new BadRequestError('---');
    }

    //Todo. Enum 유효성 검사를 진행하지 않았는데, issue에 있는 enum 유효성을 검사하는 util을 생성하는 브랜치에서 작업할 계획입니다.
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

    const modifyClothesRes: ModifyClothesRes = { isSuccess: true };
    res.json(modifyClothesRes);
  } catch (error) {
    next(error);
  }
};
