import Closet from '../entity/closet.entity';
import Clothes from '../entity/clothes.entity';
import ClosetRepository from '../repository/closet.repository';
import ClothesRepository from '../repository/clothes.repository';
import getClosetRes from '../type/closet/getCloset.res';
import getClosetClothes from '../type/clothes/getClosetClothes';
import userRes from '../type/user/user.res';
import { InternalServerError } from '../util/customErrors';

export default class ClosetService {
  static async getCloset(closetId: number): Promise<getClosetRes> {
    try {
      const closet: Closet = await ClosetRepository.findOneByClosetId(closetId);
      const clothes: Clothes[] =
        await ClothesRepository.findByClosetId(closetId);

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
    } catch (error) {
      throw new InternalServerError('옷장 정보를 불러오는 데 실패했습니다.');
    }
  }
}
