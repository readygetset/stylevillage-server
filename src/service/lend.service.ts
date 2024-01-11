import { UpdateResult } from 'typeorm';
import LendRepository from '../repository/lend.repository';
import { UnauthorizedError } from '../util/customErrors';

export default class LendService {
  static async modifyReview(
    review: string,
    lendId: number,
    userId: number,
  ): Promise<UpdateResult> {
    const loanee = await LendRepository.findLoaneeById(lendId);

    if (loanee.id != userId) {
      throw new UnauthorizedError(
        '본인이 빌렸던 대여내역에 대해서만 후기를 작성할 수 있습니다.',
      );
    }
    return await LendRepository.update({ id: lendId }, { review });
  }
}
