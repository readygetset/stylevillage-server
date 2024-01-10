import AppDataSource from '../config/dataSource';
import Lend from '../entity/lend.entity';

const LendRepository = AppDataSource.getRepository(Lend).extend({});

export default LendRepository;
