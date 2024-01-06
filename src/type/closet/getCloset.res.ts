import Cloth from '../clothes/getClosetClothes';
import User from '../../entity/user.entity'

export default interface getClosetRes {
  id?: number;
  name: string;
  owner: User;
  clothes: Array<Cloth>;
}