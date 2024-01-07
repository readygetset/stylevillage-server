import AppDataSource from '../config/dataSource';
import Cloth from '../entity/clothes.entity';

const ClothesRepository = AppDataSource.getRepository(Cloth).extend({});

export default ClothesRepository;
