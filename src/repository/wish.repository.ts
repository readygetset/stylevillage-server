import AppDataSource from '../config/dataSource';
import Wish from '../entity/wish.entity';

const WishRepository = AppDataSource.getRepository(Wish).extend({
  async findWishByData(
    userId: number,
    clothesId: number,
    isWished: boolean,
  ): Promise<Wish | null> {
    return this.findOne({
      where: {
        user: { id: userId },
        clothes: { id: clothesId },
        isWished: isWished,
      },
    });
  },
});

export default WishRepository;
