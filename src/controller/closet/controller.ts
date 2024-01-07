import { RequestHandler } from 'express';
import ClosetService from '../../service/closet.service';
import getClosetRes from '../../type/closet/getCloset.res';

export const getCloset: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.closetId);

    const closetInfo: getClosetRes = await ClosetService.getCloset(id);
    res.json(closetInfo);
  } catch (error) {
    next(error);
  }
};
