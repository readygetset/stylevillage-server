import { RequestHandler } from 'express';
import ClosetService from '../../service/closet.service';
import PostClosetRes from '../../type/closet/postCloset.res';
import getClosetRes from '../../type/closet/getCloset.res';
import modifyClosetReq from '../../type/closet/modifyCloset.req';
import modifyClosetRes from '../../type/closet/modifyCloset.res';
import Closet from '../../type/closet/closet';
import LoginUser from '../../type/user/loginUser';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import getClosetListRes from '../../type/closet/getClosetList.res';

export const postCloset: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new BadRequestError('옷장 이름을 입력하세요.');
    }
    if (!req.user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
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

export const getClosetList: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('로그인이 필요한 기능입니다.');
    }
    const { id } = req.user as LoginUser;
    const closetList: getClosetListRes = await ClosetService.getClosetList(id);
    res.json(closetList);
  } catch (error) {
    next(error);
  }
};

export const getCloset: RequestHandler = async (req, res, next) => {
  try {
    const closetId = Number(req.params.closetId);
    const user = req.user as LoginUser;

    const closetInfo: getClosetRes = await ClosetService.getCloset(
      closetId,
      req.user ? user.id : undefined,
    );

    res.json(closetInfo);
  } catch (error) {
    next(error);
  }
};

export const modifyCloset: RequestHandler = async (req, res, next) => {
  try {
    const closetId = Number(req.params.closetId);

    const user = req.user as LoginUser;
    if (!user) throw new UnauthorizedError('로그인이 필요한 기능입니다.');

    const { name } = req.body;
    if (!name) throw new BadRequestError('옷장 이름을 입력해 주세요.');

    const closet: modifyClosetReq = {
      id: closetId,
      name: name,
    };

    await ClosetService.modifyCloset(closet, user.id);

    const message: modifyClosetRes = {
      message: '옷장 이름이 변경되었습니다.',
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
