import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import ClosetService from '../../service/closet.service';
import Closet from '../../type/closet/closet';
import PostClosetRes from '../../type/closet/postCloset.res';
import LoginUser from '../../type/user/loginUser';

export const postCloset: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new BadRequestError('옷장 이름을 입력하세요.');
    }
    if (!req.user) {
      res.status(401).json({ error: '로그인이 필요한 기능입니다.' });
      return;
    }
    const { id: owner } = req.user as LoginUser;
    const closet: Closet = {
      name,
      owner,
    };
    await ClosetService.postCloset(closet);

    const postClosetRes: PostClosetRes = { name };
    res.json(postClosetRes);
  } catch (error) {
    next(error);
  }
};
