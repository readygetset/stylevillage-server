import { RequestHandler } from 'express';
import ApplyService from '../../service/apply.service';
import LoginUser from '../../type/user/loginUser';
import DefaultRes from '../../type/default.res';
import { UnauthorizedError } from '../../util/customErrors';

export const approveApply: RequestHandler = async (req, res, next) => {
  try {
    const applyId = Number(req.params.applyId);

    const user = req.user as LoginUser;
    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다');
    }

    await ApplyService.approveApply(applyId, user.id);

    const message: DefaultRes = { message: '대여신청이 수락되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const rejectApply: RequestHandler = async (req, res, next) => {
  try {
    const applyId = Number(req.params.applyId);

    const user = req.user as LoginUser;
    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다');
    }

    await ApplyService.rejectApply(applyId, user.id);

    const message: DefaultRes = { message: '대여신청이 거절되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
