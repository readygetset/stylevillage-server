import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';
import { BadRequestError } from '../util/customErrors';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({
  async findOneByClothesId(id: number): Promise<Clothes> {
    return this.findOne({
      where: { id },
      relations: { owner: true },
    }).then((clothes) => {
      if (!clothes) throw new BadRequestError('등록되어있지 않은 의류입니다.');
      return clothes;
    });
  },

  async findByClosetId(closetId: number): Promise<Clothes[]> {
    return this.find({
      where: { closet: { id: closetId }, isOpen: true },
    });
  },

  async findVisibleByClosetId(
    closetId: number,
    userId: number,
  ): Promise<Clothes[]> {
    return this.find({
      where: [
        { closet: { id: closetId }, isOpen: true },
        { closet: { id: closetId }, owner: { id: userId } },
      ],
    });
  },
});

export default ClothesRepository;
