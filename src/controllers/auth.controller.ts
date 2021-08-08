import { NextFunction, Request, Response } from 'express';
import userModel from '../database/models/user.model';
// import userModel from 'models/user.model';
import { CreateUserDto } from '../dtos/user.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import AuthService from '../services/auth.service';
import { Model } from 'sequelize';
import { CreateUserSignInDto } from 'dtos/user-signin';

class AuthController {
  public authService = new AuthService();

  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;
  //   console.log('res', userData)
  //   try {
  //     const signUpUserData: User = await this.authService.signup(userData);
  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public signIn = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const { cookie, findUser } = await this.authService.login(userData);
  //     res.setHeader('Set-Cookie', [cookie]);
  //     res.status(200).json({ data: findUser, message: 'login' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   const userData: User = req.user;

  //   try {
  //     const logOutUserData: User = await this.authService.logout(userData);
  //     res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
  //     res.status(200).json({ data: logOutUserData, message: 'logout' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }


  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserSignInDto = req.body;
    try {
      const tokenData = await this.authService.signin(userData);
      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({  auth: true, token: tokenData.token , message: 'login' });
    } catch (error) {
      next(error);
    }
  }

  // public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   const userData: User = req.user;

  //   try {
  //     const logOutUserData: User = await this.authService.logout(userData);
  //     res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
  //     res.status(200).json({ data: logOutUserData, message: 'logout' });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default AuthController;
