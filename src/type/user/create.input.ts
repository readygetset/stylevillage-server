import City from "../../common/enum/city.enum";
import Gender from "../../common/enum/gender.enum";

export default interface RegisterInput {
  username: string;
  password: string;
  nickname: string;
  gender: Gender;
  location: City;
  phoneNumber: string;
}