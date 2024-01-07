import { RequestHandler } from 'express';
import ClosetService from '../../service/closet.service';
import getClosetRes from '../../type/closet/getCloset.res';
import LoginUser from '../../type/user/loginUser';

export const getCloset: RequestHandler = async (req, res, next) => {
  try {
    const closetId = Number(req.params.closetId);
    const user = req.user as LoginUser;

    const closetInfo: getClosetRes = await ClosetService.getCloset(
      closetId,
      user.id,
    );
    res.json(closetInfo);
  } catch (error) {
    next(error);
  }
};
