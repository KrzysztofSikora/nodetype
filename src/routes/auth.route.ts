import { CreateUserSignInDto } from '../dtos/user-signin';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/user.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`/signin`, validationMiddleware(CreateUserSignInDto), this.authController.signIn);
    // this.router.post(`/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
