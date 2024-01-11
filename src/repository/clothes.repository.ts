import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';
import { BadRequestError } from '../util/customErrors';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({
  async findOneByClothesId(id: number): Promise<Clothes> {
    return this.findOne({
      where: { id },
      relations: { closet: { owner: true } },
    }).then((clothes) => {
      if (!clothes) throw new BadRequestError('등록되어있지 않은 의류입니다.');
      return clothes;
    });
  },

  async findOpenByClosetId(closetId: number): Promise<Clothes[]> {
    return this.find({
      where: { id: closetId, isOpen: true },
    });
  },

  async findVisibleByClosetId(
    closetId: number,
    userId: number,
  ): Promise<Clothes[]> {
    return this.find({
      where: [
        { id: closetId, isOpen: true },
        { id: closetId, closet: { owner: { id: userId } } },
      ],
    });
  },
});

export default ClothesRepository;
