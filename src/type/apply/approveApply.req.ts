export default interface approveApplyReq {
  id: number;
  user: number;
  clothes: number;
  detail: string;
  isAccpted: boolean;
}

// Table apply {
//     id int [pk, increment]
//     user int [ref: > user.id]
//     clothes int [ref: > clothes.id]
//     is_accepted boolean
//     is_rejected boolean
//     detail varchar
//   }
