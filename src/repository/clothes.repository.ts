import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';
import { BadRequestError } from '../util/customErrors';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({
  async findOneByClothesId(id: number): Promise<Clothes> {
    return this.findOneBy({ id }).then((clothes) => {
      if (!clothes) {
        throw new BadRequestError('등록되어있지 않은 의류입니다.');
      }
      return clothes;
    });
  },
});

export default ClothesRepository;
