import Clothes from '../type/clothes/Clothes';
import User from '../entity/user.entity';
import CreateClothesReq from '../type/clothes/createClothes.req';
import ClothesRepository from '../repository/clothes.repository';
import ModifyClothesReq from '../type/clothes/modifyClothes.req';
import { UpdateResult } from 'typeorm';
import GetClothesReq from '../type/clothes/getClothes.req';
import GetClothesRes from '../type/clothes/getClothes.res';
import { BadRequestError, ForbiddenError } from '../util/customErrors';
import UserRepository from '../repository/user.repository';
import WishRepository from '../repository/wish.repository';
import GetWishListRes from '../type/clothes/getWishList.res';

export default class ClothesService {
  static async createClothes(
    clothesInfo: CreateClothesReq,
    userId: number,
  ): Promise<Clothes> {
    //Todo. image 유효성 검사
    const userInfo = (await UserRepository.findOneByUserId(userId)) as User;

    const clothes: Clothes = {
      closet: clothesInfo.closet,
      category: clothesInfo.category,
      season: clothesInfo.season,
      status: clothesInfo.status,
      isOpen: clothesInfo.isOpen,
      name: clothesInfo.name,
      tag: clothesInfo.tag,
      image: clothesInfo.image,
      owner: userInfo,
    };

    if (clothesInfo.closet && clothesInfo.closet?.owner.id != userId) {
      throw new BadRequestError('본인의 옷장만 지정할 수 있습니다.');
    }

    const newClothes: Clothes = ClothesRepository.create(clothes);
    return await ClothesRepository.save(newClothes);
  }

  static async modifyClothes(
    userId: number,
    clothesId: number,
    clothesInfo: ModifyClothesReq,
  ): Promise<UpdateResult> {
    const clothes = await ClothesRepository.findOneByClothesId(clothesId);

    if (clothes.owner.id != userId) {
      throw new BadRequestError('본인의 옷만 수정할 수 있습니다.');
    }

    if (clothesInfo.closet && clothesInfo.closet?.owner.id != userId) {
      throw new BadRequestError('본인의 옷장만 지정할 수 있습니다.');
    }

    return await ClothesRepository.update({ id: clothesId }, clothesInfo);
  }

  static async getClothes(
    id: GetClothesReq,
    userId: number | null,
  ): Promise<GetClothesRes> {
    const { clothesId } = id;
    const clothes = await ClothesRepository.findOneByClothesId(clothesId);

    if (clothes.isOpen || (userId && userId === clothes.owner.id)) {
      let isWished = false;

      if (userId) {
        const user = await UserRepository.findOneByUserId(userId);
        const wish = await WishRepository.findWishByData(user, clothes, true);
        if (wish) {
          isWished = true;
        }
      }

      const getClothesRes: GetClothesRes = {
        id: clothes.id,
        closet: clothes.closet,
        category: clothes.category,
        season: clothes.season,
        status: clothes.status,
        isOpen: clothes.isOpen,
        name: clothes.name,
        tag: clothes.tag,
        image: clothes.image,
        owner: clothes.owner,
        isWished: isWished,
      };

      return getClothesRes;
    } else throw new ForbiddenError('공개되지 않은 옷입니다.');
  }

  static async deleteClothes(
    clothesId: number,
    userId: number,
  ): Promise<UpdateResult> {
    const clothes = await ClothesRepository.findOneByClothesId(clothesId);

    if (clothes.owner.id != userId) {
      throw new BadRequestError('본인의 옷만 삭제할 수 있습니다.');
    }

    return await ClothesRepository.softDelete(clothesId);
  }

  static async getWishList(userId: number): Promise<GetWishListRes> {
    const wishesInfo = await WishRepository.findWishesByUser(userId);
    const wishListPromises = wishesInfo.map(async (wish) => {
      if (!wish.clothes)
        throw new BadRequestError('찜 목록에 존재하지 않는 옷이 있습니다');
      return wish.clothes;
    });
    const wishList = await Promise.all(wishListPromises);
    //    wishList.sort((a, b) => b.createdAt - a.createdAt);
    return { wishList };
  }
}
