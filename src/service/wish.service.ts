import Wish from '../entity/wish.entity';
import { UpdateResult } from 'typeorm';
import CreateWishReq from '../type/wish/createWish.req';
import DeleteWishReq from '../type/wish/deleteWish.req';
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

  static async deleteWish(wishInfo: DeleteWishReq): Promise<UpdateResult> {
    const { wishId, isWished } = wishInfo;

    if (!isWished) {
      throw new BadRequestError('찜하지 않은 옷입니다.');
    }

    await WishRepository.findWishById(wishId);

    return await WishRepository.softDelete(wishId);
  }
}
