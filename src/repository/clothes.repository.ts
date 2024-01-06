import AppDataSource from '../config/dataSource';
import Cloth from '../entity/clothes.entity';
import { BadRequestError } from '../util/customErrors';

const ClothesRepository = AppDataSource.getRepository(Cloth).extend({});

export default ClothesRepository;
