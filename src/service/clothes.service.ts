import Clothes from '../entity/clothes.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import ModifyClothesReq from '../type/clothes/modifyClothes.req';
import { UpdateResult } from 'typeorm';

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
}
