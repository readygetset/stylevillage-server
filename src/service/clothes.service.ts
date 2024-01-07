import Clothes from '../entity/clothes.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import ModifyClothesReq from '../type/clothes/modifyClothes.req';
import { UpdateResult } from 'typeorm';
import GetClothesReq from '../type/getClothes/getClothes.req';
import GetClothesRes from '../type/getClothes/getClothes.res';
import { ForbiddenError } from '../util/customErrors';

export default class ClothesService {
  static async createClothes(clothesInfo: CreateClothesReq): Promise<Clothes> {
    //Todo. image 유효성 검사
    const newClothes = ClothesRepository.create(clothesInfo);
    return await ClothesRepository.save(newClothes);
  }

  static async modifyClothes(
    id: number,
    clothesInfo: ModifyClothesReq,
  ): Promise<UpdateResult> {
    await ClothesRepository.findOneByClothesId(id);
    return await ClothesRepository.update({ id: id }, clothesInfo);
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
