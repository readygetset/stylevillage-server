import Closet from '../../entity/closet.entity';
import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';

export default interface ModifyClothesReq {
  id: number;
  closet?: Closet;
  category?: Category;
  season?: Season;
  status?: Status;
  isOpen?: boolean;
  name?: string;
  tag?: string;
  image?: string;
}
