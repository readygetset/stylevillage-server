import Lend from '../entity/lend.entity';
import createLendReq from '../type/lend/createLend.req';

export default class lendService {
  static async createLend(lend: createLendReq): Promise<Lend> {}
}
