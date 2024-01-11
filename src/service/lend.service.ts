import LendRepository from '../repository/lend.repository';
import getLendsRes from '../type/lend/getLends.res';

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
}
