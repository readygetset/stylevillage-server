import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({
  async findByClosetId(closetId: number): Promise<Clothes[]> {
    return this.find({
      where: { id: closetId, is_opened: true },
    });
  },
});

export default ClothesRepository;
