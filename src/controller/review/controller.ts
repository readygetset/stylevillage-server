import { RequestHandler } from 'express';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import LoginUser from '../../type/user/loginUser';
import LendService from '../../service/lend.service';
import DefaultRes from '../../type/default.res';

export const deleteReview: RequestHandler = async (req, res, next) => {
  try {
    const lendId = Number(req.params.lendId);
    if (!lendId) {
      throw new BadRequestError('해당 대여 내역이 없습니다.');
    }
    const user = req.user as LoginUser;
    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }
    await LendService.deleteReview(user.id, lendId);
    const message: DefaultRes = { message: '리뷰가 삭제되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
