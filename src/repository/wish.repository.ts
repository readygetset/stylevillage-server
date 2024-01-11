import AppDataSource from '../config/dataSource';
import Wish from '../entity/wish.entity';
import User from '../entity/user.entity';
import Clothes from '../entity/clothes.entity';

const WishRepository = AppDataSource.getRepository(Wish).extend({
  async findWishByData(
    user: User,
    clothes: Clothes,
    isWished: boolean,
  ): Promise<Wish | null> {
    return this.findOne({
      where: {
        user: { id: user.id },
        clothes: { id: clothes.id },
        isWished: isWished,
      },
    }).then((wish) => {
      return wish;
    });
  },
});

export default WishRepository;
