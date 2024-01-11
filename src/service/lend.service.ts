import { UpdateResult } from 'typeorm';
import LendRepository from '../repository/lend.repository';
import getLendsRes from '../type/lend/getLends.res';
import { BadRequestError } from '../util/customErrors';

export default class LendService {
  static async getLendsAsLender(userId: number): Promise<getLendsRes[]> {
    const lendsAsLender: getLendsRes[] =
      await LendRepository.findByLenderId(userId);
    return lendsAsLender;
  }

  static async getLendAsLoanee(userId: number): Promise<getLendsRes[]> {
    const lendsAsLoanee: getLendsRes[] =
      await LendRepository.findByLoaneeId(userId);
    return lendsAsLoanee;
  }

  static async deleteReview(
    userId: number,
    lendId: number,
  ): Promise<UpdateResult> {
    const lend = await LendRepository.findOneByLendId(lendId);

    if (lend.loanee.id != userId) {
      throw new BadRequestError(
        '본인이 빌린 옷에 대한 리뷰만 삭제할 수 있습니다.',
      );
    }
    if (!lend.review) {
      throw new BadRequestError('삭제할 리뷰가 없습니다.');
    }

    return await LendRepository.update({ id: lendId }, { review: '' });
  }
}
