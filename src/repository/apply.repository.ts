import AppDataSource from '../config/dataSource';
import Apply from '../entity/apply.entity';

const ApplyRepository = AppDataSource.getRepository(Apply).extend({});

export default ApplyRepository;
