import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserDto } from "../dtos/user.dto";
import HttpException from "../exceptions/HttpException";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../database/models/user.model";
import { isEmptyObject } from "../utils/util";
import { CreateUserSignInDto } from "dtos/user-signin";

class AuthService {
  public user = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData))
      throw new HttpException(400, "You're not userData");

    const findUser: any = await this.user.findOne({
      where: {
        email: userData.email,
      },
    });

    if (findUser) {
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = {
      ...userData,
      password: hashedPassword,
    };

    await this.user.create(createUserData);
    return createUserData;
  }

  public async signin(userData: CreateUserSignInDto): Promise<TokenData> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "You're not userData");

    }
    console.log('user', userData)
      const findUser: any = await this.user.findOne({
        where: {
          email: userData.email,
        },
      });

    if (!findUser)
      throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);

    return tokenData;
  }

  // public async logout(userData: User): Promise<User> {
  //   if (isEmptyObject(userData))
  //     throw new HttpException(400, "You're not userData");

  //   const findUser: User = this.users.find(
  //     (user) => user.password === userData.password
  //   );
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   return findUser;
  // }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
