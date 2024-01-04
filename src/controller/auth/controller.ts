import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import AuthService from '../../service/auth.service';
import RegisterReq from '../../type/user/register.req';
import RegisterRes from '../../type/user/register.res';
import LoginReq from '../../type/user/login.req';
import LoginRes from '../../type/user/login.res';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, nickname, gender, location, phoneNumber } =
      req.body;

    if (
      !username ||
      !password ||
      !nickname ||
      !gender ||
      !location ||
      !phoneNumber
    ) {
      throw new BadRequestError('All fields are required.');
    }

    const user: RegisterReq = {
      username,
      password,
      nickname,
      gender,
      location,
      phoneNumber,
    };

    await AuthService.register(user);

    const registerRes: RegisterRes = { username };
    res.json(registerRes);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError('All fields are required.');
    }

    const loginInfo: LoginReq = { username, password };
    const accessToken = await AuthService.login(loginInfo);

    const loginRes: LoginRes = { accessToken };
    res.json(loginRes);
  } catch (error) {
    next(error);
  }
};
