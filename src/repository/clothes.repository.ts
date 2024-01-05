import AppDataSource from '../config/dataSource';
import Clothes from '../entity/clothes.entity';

const ClothesRepository = AppDataSource.getRepository(Clothes).extend({});

export default ClothesRepository;
