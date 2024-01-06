import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import ClosetService from '../../service/closet.service';
// import getClosetReq from '../../type/closet/getCloset.req';
import getClosetRes from '../../type/closet/getCloset.res';
import Cloth from '../../type/clothes/getClosetClothes';

export const getClosetById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.closetId);

    const closet = await ClosetService.getClosetById(id);
    if (!closet) throw new BadRequestError('해당하는 옷장이 없습니다.');

    const clothes = await ClosetService.getClothesInCloset(id);

    const clothesInfo: Array<Cloth> = clothes.map((cloth) => {
      const eachCloth: Cloth = {
        id: cloth.id,
        category: cloth.category,
        season: cloth.season,
        status: cloth.status,
        name: cloth.name,
        tag: cloth.tag,
        image: cloth.image,
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
