import { RequestHandler } from 'express';
import LoginUser from '../../type/user/loginUser';
import { BadRequestError } from '../../util/customErrors';
import LendService from '../../service/lend.service';
import DefaultRes from '../../type/default.res';

export const modifyReview: RequestHandler = async (req, res, next) => {
  try {
    const lendId = Number(req.params.lendId);
    const user = req.user as LoginUser;
    const { review } = req.body;

    if (!user) {
      throw new BadRequestError('로그인이 필요한 기능입니다.');
    }

    await LendService.modifyReview(review, lendId, user.id);

    const message: DefaultRes = { message: '후기가 수정되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
