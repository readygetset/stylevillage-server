import Closet from '../entity/closet.entity';
import Clothes from '../entity/clothes.entity';
import ClosetRepository from '../repository/closet.repository';
import ClothesRepository from '../repository/clothes.repository';
import getClosetRes from '../type/closet/getCloset.res';
import getClosetClothes from '../type/clothes/getClosetClothes';
import userRes from '../type/user/user.res';
import PostClosetReq from '../type/closet/postCloset.req';
import { DuplicateValueError } from '../util/customErrors';

export default class ClosetService {
  static async getCloset(
    closetId: number,
    userId: number | undefined,
  ): Promise<getClosetRes> {
    const closet: Closet = await ClosetRepository.findOneByClosetId(closetId);
    const clothes: Clothes[] = !userId
      ? await ClothesRepository.findByClosetId(closetId)
      : await ClothesRepository.findVisibleByClosetId(closetId, userId);

    const clothesInfo: Array<getClosetClothes> = clothes.map((clothes) => {
      const eachClothes: getClosetClothes = {
        id: clothes.id,
        category: clothes.category,
        season: clothes.season,
        status: clothes.status,
        name: clothes.name,
        tag: clothes.tag,
        image: clothes.image,
      };
      return eachClothes;
    });

    const ownerInfo: userRes = {
      id: closet.owner.id,
      username: closet.owner.username,
      nickname: closet.owner.nickname,
    };

    const closetInfo: getClosetRes = {
      id: closet.id,
      name: closet.name,
      owner: ownerInfo,
      clothes: clothesInfo,
    };

    return closetInfo;
  }

  static async postCloset(closet: PostClosetReq): Promise<Closet> {
    const isDuplicate = await ClosetRepository.checkDuplicateCloset(
      closet.name,
    );

    if (isDuplicate) throw new DuplicateValueError('중복되는 옷장 이름입니다.');
    const newCloset = ClosetRepository.create(closet);
    return await ClosetRepository.save(newCloset);
  }
}
