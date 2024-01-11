import AppDataSource from '../config/dataSource';
import Lend from '../entity/lend.entity';
import ReviewRes from '../type/lend/review.res';
import UserRes from '../type/user/user.res';
import { BadRequestError } from '../util/customErrors';

const LendRepository = AppDataSource.getRepository(Lend).extend({
  async findByClothesId(clothesId: number): Promise<Lend[]> {
    return this.find({
      where: { clothes: { id: clothesId } },
    });
  },

  async getLoaneeById(id: number): Promise<UserRes> {
    const lend = await this.findOne({
      where: { id },
      relations: { loanee: true },
    }).then((lend) => {
      if (!lend) throw new BadRequestError('대여 내역이 존재하지 않습니다.');
      return lend;
    });
    const loanee: UserRes = {
      id: lend.loanee.id,
      username: lend.loanee.username,
      nickname: lend.loanee.nickname,
    };
    return loanee;
  },

  async getReviewByClothesId(clothesId: number): Promise<ReviewRes[]> {
    const lends = await this.findByClothesId(clothesId);
    const reviewsPromises = lends.map(async (lend: Lend) => {
      if (!lend || !lend.review || !lend.id) return undefined;
      else {
        const reviewer = await LendRepository.getLoaneeById(lend.id);
        const review: ReviewRes = { review: lend.review, reviewer: reviewer };
        return review;
      }
    });
    const reviews = await Promise.all(reviewsPromises);

    return reviews.filter((review) => review !== undefined) as ReviewRes[];
  },
});

export default LendRepository;
