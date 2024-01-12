import LendRepository from '../repository/lend.repository';
import getLendsRes from '../type/lend/getLends.res';
import createLendReq from '../type/lend/createLend.req';
import Lend from '../entity/lend.entity';

export default class LendService {
  static async createLend(lendInfo: createLendReq): Promise<Lend> {
    const newLend = LendRepository.create(lendInfo);
    return await LendRepository.save(newLend);
  }

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
