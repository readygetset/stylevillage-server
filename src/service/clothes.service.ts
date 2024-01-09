import Clothes from '../entity/clothes.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import ModifyClothesReq from '../type/clothes/modifyClothes.req';
import { UpdateResult } from 'typeorm';
import GetClothesReq from '../type/clothes/getClothes.req';
import GetClothesRes from '../type/clothes/getClothes.res';
import { BadRequestError, ForbiddenError } from '../util/customErrors';

export default class ClothesService {
  static async createClothes(clothesInfo: CreateClothesReq): Promise<Clothes> {
    //Todo. image 유효성 검사
    const newClothes = ClothesRepository.create(clothesInfo);
    return await ClothesRepository.save(newClothes);
  }

  static async modifyClothes(
    userId: number,
    clothesId: number,
    clothesInfo: ModifyClothesReq,
  ): Promise<UpdateResult> {
    const clothes = await ClothesRepository.findOneByClothesId(clothesId);

    if (clothes.closet.owner.id != userId) {
      throw new BadRequestError('본인의 옷만 수정할 수 있습니다.');
    }

    return await ClothesRepository.update({ id: clothesId }, clothesInfo);
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
