import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({
  async findByClosetId(closetId: number): Promise<Clothes[]> {
    return this.find({
      where: { id: closetId },
    });
  },

  async findVisibleByClosetId(
    closetId: number,
    userId: number,
  ): Promise<Clothes[]> {
    return this.find({
      where: [
        { id: closetId, is_opened: true },
        { id: closetId, closet: { owner: { id: userId } } },
      ],
    });
  },
});

export default ClothesRepository;
