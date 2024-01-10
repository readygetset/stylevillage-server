import AppDataSource from '../config/dataSource';
import Lend from '../entity/lend.entity';
import User from '../entity/user.entity';
import { BadRequestError } from '../util/customErrors';

const LendRepository = AppDataSource.getRepository(Lend).extend({
  async findLoaneeById(id: number): Promise<User> {
    return this.findOne({
      where: { id },
      relations: { loanee: true },
    }).then((lend) => {
      if (!lend)
        throw new BadRequestError('해당 대여내역이 존재하지 않습니다.');
      return lend.loanee;
    });
  },
});

export default LendRepository;
