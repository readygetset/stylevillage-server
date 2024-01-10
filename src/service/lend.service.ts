import Lend from '../entity/lend.entity';
import LendRepository from '../repository/lend.repository';

export default class LendService {
  static async getLendsAsLender(userId: number): Promise<Lend[]> {
    return LendRepository.find({
      where: { lender: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  static async getLendAsLoanee(userId: number): Promise<Lend[]> {
    return LendRepository.find({
      where: { loanee: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
