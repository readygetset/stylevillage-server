import Wish from '../entity/wish.entity';
import CreateWishReq from '../type/wish/createWish.req';
import ClothesRepository from '../repository/clothes.repository';
import UserRepository from '../repository/user.repository';
import WishRepository from '../repository/wish.repository';
import { BadRequestError } from '../util/customErrors';

export default class WishService {
  static async createWish(
    wishInfo: CreateWishReq,
    username: string,
  ): Promise<Wish> {
    const isWished = wishInfo.isWished;

    if (isWished) {
      throw new BadRequestError('이미 찜한 옷입니다.');
    }

    const clothes = await ClothesRepository.findOneByClothesId(
      wishInfo.clothesId,
    );
    const user = await UserRepository.findOneByUsername(username);

    const newWish = WishRepository.create({
      user: user,
      clothes: clothes,
      isWished: true,
    });
    return await WishRepository.save(newWish);
  }

  static async deleteWish(
    wishInfo: CreateWishReq,
    username: string,
  ): Promise<Wish> {
    const isWished = wishInfo.isWished;

    if (!isWished) {
      throw new BadRequestError('찜하지 않은 옷입니다.');
    }

    const clothes = await ClothesRepository.findOneByClothesId(
      wishInfo.clothesId,
    );
    const user = await UserRepository.findOneByUsername(username);

    //test for softDelete
    //const id = 4;
    //const wish = await WishRepository.findWishById(id);
    const wish = await WishRepository.findWishByData(user, clothes, isWished);

    if (!wish.id)
      throw new BadRequestError('해당 옷에 대한 찜 정보를 찾을 수 없습니다.');
    await WishRepository.softDelete(wish.id);

    return wish;
  }
}
