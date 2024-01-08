import { UpdateResult } from 'typeorm';
import ApplyRepository from '../repository/apply.repository';
import approveApplyReq from '../type/apply/approveApply.req';

export default class ApplyService {
  static async approveApply(apply: approveApplyReq): Promise<UpdateResult> {
    if (apply.isAccpted) {
      return await ApplyRepository.update(
        { id: apply.id },
        { isAccepted: true },
      );
    }
    return await ApplyRepository.update({ id: apply.id }, { isRejected: true });
  }
}
