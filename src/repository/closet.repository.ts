import AppDataSource from '../config/dataSource';
import Closet from '../entity/closet.entity';
import { BadRequestError } from '../util/customErrors';

const ClosetRepository = AppDataSource.getRepository(Closet).extend({
  async findOneByClosetId(id: number): Promise<Closet> {
    return this.findOne({ where: { id } }).then((closet) => {
      if (!closet) throw new BadRequestError('옷장이 존재하지 않습니다.');
      return closet;
    });
  },

  async checkDuplicateCloset(name: string): Promise<boolean> {
    return this.findOneBy({ name }).then((closet) => {
      if (closet) return true;
      return false;
    });
  },
});

export default ClosetRepository;
