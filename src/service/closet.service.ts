import Closet from '../entity/closet.entity';
import Cloth from '../entity/clothes.entity';
import ClosetRepository from '../repository/closet.repository';
import ClothesRepository from '../repository/clothes.repository';
import { InternalServerError } from '../util/customErrors';

export default class ClosetService {
  static async getClosetById(id: number): Promise<Closet | null> {
    try {
      return await ClosetRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerError('옷장 정보를 불러오는 데 실패했습니다.');
    }
  }

  static async getClothesInCloset(closetId: number): Promise<Cloth[]>{
    try {
      return await ClothesRepository.find({
        where: { id: closetId, is_opened: true }
      });
    } catch (error) {
      throw new InternalServerError('옷장 내 옷 정보를 불러오는 데 실패했습니다.');
    }
  }
};