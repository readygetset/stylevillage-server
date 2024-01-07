import Clothes from '../entity/clothes.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import ModifyClothesReq from '../type/clothes/modifyClothes.req';
import { UpdateResult } from 'typeorm';

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

  static async modifyClothes(
    clothesInfo: ModifyClothesReq,
  ): Promise<UpdateResult> {
    try {
      const clothesId = clothesInfo.id;
      await ClothesRepository.findOneByClothesId(clothesId);

      return await ClothesRepository.update({ id: clothesId }, clothesInfo);
    } catch (error) {
      throw new Error(`error in modifyClothes : ${error}`);
    }
  }
}
