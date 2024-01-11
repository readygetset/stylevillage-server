import AppDataSource from '../config/dataSource';
import Lend from '../entity/lend.entity';
import { BadRequestError } from '../util/customErrors';

const LendRepository = AppDataSource.getRepository(Lend).extend({
  async findByLenderId(lender: number): Promise<Lend[]> {
    return this.createQueryBuilder('lend')
      .leftJoinAndSelect('lend.lender', 'lender')
      .leftJoinAndSelect('lend.loanee', 'loanee')
      .where({ lender })
      .select(getLendsResFields)
      .orderBy('lend.createdAt', 'DESC')
      .getMany();
  },

  async findByLoaneeId(loanee: number): Promise<Lend[]> {
    return this.createQueryBuilder('lend')
      .leftJoinAndSelect('lend.lender', 'lender')
      .leftJoinAndSelect('lend.loanee', 'loanee')
      .where({ loanee })
      .select(getLendsResFields)
      .orderBy('lend.createdAt', 'DESC')
      .getMany();
  },

  async findOneByLendId(id: number): Promise<Lend> {
    return this.findOne({
      where: { id },
      relations: { loanee: true },
    }).then((lend) => {
      if (!lend) throw new BadRequestError('존재하지 않는 대여 내역입니다.');
      return lend;
    });
  },
});

const getLendsResFields = [
  'lend.id',
  'lend.clothes',
  'lend.price',
  'lend.startDate',
  'lend.endDate',
  'lend.review',
  'lender.id',
  'lender.username',
  'lender.nickname',
  'loanee.id',
  'loanee.username',
  'loanee.nickname',
];

export default LendRepository;
