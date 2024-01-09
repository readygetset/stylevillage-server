import { UpdateResult } from 'typeorm';
import ApplyRepository from '../repository/apply.repository';
import approveApplyReq from '../type/apply/approveApply.req';
import { UnauthorizedError } from '../util/customErrors';

export default class ApplyService {
  static async approveApply(
    approveApplyReq: approveApplyReq,
    userId: number,
  ): Promise<UpdateResult> {
    const apply = await ApplyRepository.findOneByApplyId(approveApplyReq.id);

    if (userId != apply.clothes.closet.owner.id) {
      throw new UnauthorizedError(
        '본인의 옷에 대한 대여신청만 수락할 수 있습니다.',
      );
    }

    return await ApplyRepository.update({ id: apply.id }, { isAccepted: true });
  }
}
