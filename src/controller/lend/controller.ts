import { RequestHandler } from 'express';
import approveApplyReq from '../../type/apply/approveApply.req';
import ApplyService from '../../service/apply.service';
import LoginUser from '../../type/user/loginUser';
import DefaultRes from '../../type/default.res';
import { UnauthorizedError } from '../../util/customErrors';

export const approveApply: RequestHandler = async (req, res, next) => {
  try {
    const applyId = Number(req.params.applyId);

    const approveApplyReq: approveApplyReq = {
      id: applyId,
    };

    const user = req.user as LoginUser;
    if (!user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다');
    }

    await ApplyService.approveApply(approveApplyReq, user.id);

    const message: DefaultRes = { message: '대여신청이 수락되었습니다.' };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
