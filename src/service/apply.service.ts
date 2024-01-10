import { UpdateResult } from 'typeorm';
import ApplyRepository from '../repository/apply.repository';
import { UnauthorizedError } from '../util/customErrors';

export default class ApplyService {
  static async approveApply(
    applyId: number,
    userId: number,
  ): Promise<UpdateResult> {
    const apply = await ApplyRepository.findOneByApplyId(applyId);

    if (userId != apply.clothes.closet.owner.id) {
      throw new UnauthorizedError(
        '본인의 옷에 대한 대여신청만 수락할 수 있습니다.',
      );
    }

    return await ApplyRepository.update({ id: apply.id }, { isAccepted: true });
  }

  static async rejectApply(
    applyId: number,
    userId: number,
  ): Promise<UpdateResult> {
    const apply = await ApplyRepository.findOneByApplyId(applyId);

    if (userId != apply.clothes.closet.owner.id) {
      throw new UnauthorizedError(
        '본인의 옷에 대한 대여신청만 거절할 수 있습니다.',
      );
    }

    return await ApplyRepository.update({ id: apply.id }, { isRejected: true });
  }
}
