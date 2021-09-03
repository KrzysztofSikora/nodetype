import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import HttpException from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';

/**
 * Middleware for check if user exist as jwt token. Verify and get userId from jwt token.
 * @param req - Headers with token.
 * @param res - Unused.
 * @param next - Send userId.
 */
function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] as string;

  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse: any = jwt.verify(token, secret);
      const userId = verificationResponse.id;
      if (userId) {
        req.user = userId;
        next();
      } else {
        next(new HttpException(401, 'wrong-authentication-token'));
      }
    } catch (error) {
      next(new HttpException(401, 'wrong-authentication-token'));
    }
  } else {
    next(new HttpException(404, 'authentication-token-missing'));
  }
}

export default authMiddleware;
