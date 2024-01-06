import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import ClosetService from '../../service/closet.service';
// import getClosetReq from '../../type/closet/getCloset.req';
import getClosetRes from '../../type/closet/getCloset.res';
import Clothes from '../../type/clothes/getClosetClothes';

export const getClosetById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.closetId);

    const closet = await ClosetService.getClosetById(id);
    if (!closet) throw new BadRequestError('해당하는 옷장이 없습니다.');

    const clothes = await ClosetService.getClothesInCloset(id);

    const clothesInfo: Array<Clothes> = clothes.map((clothes) => {
      const eachCloth: Clothes = {
        id: clothes.id,
        category: clothes.category,
        season: clothes.season,
        status: clothes.status,
        name: clothes.name,
        tag: clothes.tag,
        image: clothes.image,
      };
      return eachCloth;
    });

    const closetInfo: getClosetRes = {
      id: closet.id,
      name: closet.name,
      owner: closet.owner,
      clothes: clothesInfo,
    };

    res.json(closetInfo);
  } catch (error) {
    next(error);
  }
};
