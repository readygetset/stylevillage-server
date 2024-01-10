import { RequestHandler } from 'express';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import WishService from '../../service/wish.service';
import CreateWishReq from '../../type/wish/createWish.req';
import DeleteWishReq from '../../type/wish/deleteWish.req';
import DefaultRes from '../../type/default.res';
import LoginUser from '../../type/user/loginUser';

export const createWish: RequestHandler = async (req, res, next) => {
  try {
    const clothesId = Number(req.params.clothesId);

    if (!clothesId) throw new BadRequestError('ClothesId is required.');

    const user = req.user as LoginUser;

    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    const { isWished } = req.body;

    const wishInfo: CreateWishReq = {
      clothesId,
      isWished,
    };

    await WishService.createWish(wishInfo, user.username);

    const message: DefaultRes = { message: '찜이 생성되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteWish: RequestHandler = async (req, res, next) => {
  try {
    const clothesId = Number(req.params.clothesId);
    const { isWished, wishId } = req.body;

    if (!clothesId) throw new BadRequestError('ClothesId is required.');
    if (!wishId) throw new BadRequestError('WishId is required.');

    const user = req.user as LoginUser;

    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }

    const wishInfo: DeleteWishReq = {
      clothesId,
      wishId,
      isWished,
    };

    await WishService.deleteWish(wishInfo);

    const message: DefaultRes = { message: '찜이 삭제되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
