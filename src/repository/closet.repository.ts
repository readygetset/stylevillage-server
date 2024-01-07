import AppDataSource from '../config/dataSource';
import Closet from '../entity/closet.entity';

const ClosetRepository = AppDataSource.getRepository(Closet).extend({
  async checkDuplicateCloset(name: string): Promise<boolean> {
    return this.findOneBy({ name }).then((closet) => {
      if (closet) return true;
      return false;
    });
  },
});

export default ClosetRepository;
