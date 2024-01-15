import Category from '../../common/enum/category.enum';
import Season from '../../common/enum/season.enum';
import Status from '../../common/enum/status.enum';

export default interface GetClothesListRes {
  id: number;
  closetId: number | null;
  category: Category | null;
  season: Season | null;
  status: Status;
  isOpen: boolean;
  name: string;
  tag: string | null;
  isWished: boolean;
}
