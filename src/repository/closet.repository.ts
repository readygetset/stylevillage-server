import AppDataSource from '../config/dataSource';
import Closet from '../entity/closet.entity';

const ClosetRepository = AppDataSource.getRepository(Closet).extend({});

export default ClosetRepository;
