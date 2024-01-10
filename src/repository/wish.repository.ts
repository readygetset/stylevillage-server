import AppDataSource from '../config/dataSource';
import Wish from '../entity/wish.entity';
import User from '../entity/user.entity';
import Clothes from '../entity/clothes.entity';
import { BadRequestError } from '../util/customErrors';

const WishRepository = AppDataSource.getRepository(Wish).extend({
  async findWishByData(
    user: User,
    clothes: Clothes,
    isWished: boolean,
  ): Promise<Wish> {
    return this.findOne({
      where: { user, clothes, isWished },
      withDeleted: false,
    }).then((wish) => {
      if (!wish)
        throw new BadRequestError('해당 옷에 대한 찜 정보를 찾을 수 없습니다.');
      return wish;
    });
  },

  //for test softDelete
  async findWishById(id: number): Promise<Wish> {
    return this.findOne({
      where: { id: id },
    }).then((wish) => {
      if (!wish)
        throw new BadRequestError('해당 옷에 대한 찜 정보를 찾을 수 없습니다.');
      return wish;
    });
  },
});

export default WishRepository;
