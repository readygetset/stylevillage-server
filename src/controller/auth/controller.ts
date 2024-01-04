import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import { BadRequestError } from '../../util/customErrors';

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
      const { username, password, nickname, gender, location, phoneNumber } = req.body;
  
      if (!username || !password || !nickname || !gender || !location || !phoneNumber) {
        throw new BadRequestError('All fields are required.');
      }

      const secretKey = process.env.SECRET_KEY
      
      const hashedPassword = await bcrypt.hash(password + secretKey, 10);

      const user = {
        username,
        password: hashedPassword,
        nickname,
        gender,
        location,
        phoneNumber,
        is_banned: false,
      };
      
      const savedUser = await UserService.saveUser(user);
  
      res.status(201).json({ isSuccess: true });
    } catch (error) {
      next(error);
    }
  };
