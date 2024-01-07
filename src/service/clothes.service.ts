import Clothes from '../entity/clothes.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import GetClothesReq from '../type/getClothes/getClothes.req';
import GetClothesRes from '../type/getClothes/getClothes.res';
import { ForbiddenError } from '../util/customErrors';

export default class ClothesService {
  static async createClothes(clothesInfo: CreateClothesReq): Promise<Clothes> {
    try {
      //Todo. image 유효성 검사

      const newClothes = ClothesRepository.create(clothesInfo);
      return await ClothesRepository.save(newClothes);
    } catch (error) {
      throw new Error(`error in createClothes : ${error}`);
    }
  }

  static async getClothes(
    id: GetClothesReq,
    userId: number | null,
  ): Promise<GetClothesRes> {
    const { clothesId } = id;
    const clothes = await ClothesRepository.findOneByClothesId(clothesId);

    if (clothes.isOpen || (userId && userId === clothes.closet.owner.id)) {
      const getClothesRes: GetClothesRes = clothes;
      return getClothesRes;
    } else throw new ForbiddenError('공개되지 않은 옷입니다.');
  }
}
