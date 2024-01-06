import ClosetRepository from '../repository/closet.repository';
import Closet from '../entity/closet.entity';
import PostCloset from '../type/closet/closet';
import { DuplicateValueError } from '../util/customErrors';
import PostClosetReq from '../type/closet/postCloset.req';

export default class ClosetService {
  static async postCloset(closet: PostClosetReq): Promise<Closet> {
    const isDuplicate = await ClosetRepository.checkDuplicateCloset(
      closet.name,
    );

    if (isDuplicate) throw new DuplicateValueError('중복되는 옷장 이름입니다.');
    const newCloset = ClosetRepository.create(closet);
    return await ClosetRepository.save(newCloset);
  }
}
