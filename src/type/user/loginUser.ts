export default interface LoginUser extends Express.User {
  id: string;
  username: string;
  nickname: string;
}
