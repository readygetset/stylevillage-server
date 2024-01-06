import AppDataSource from '../config/dataSource';
import Closet from '../entity/closet.entity';
import { BadRequestError } from '../util/customErrors';

const ClosetRepository = AppDataSource.getRepository(Closet).extend({});

export default ClosetRepository