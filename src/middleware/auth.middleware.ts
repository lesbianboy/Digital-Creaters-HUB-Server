import { NextFunction, Request, Response } from 'express'
import { Unauthorized } from '../exceptions/Unauthorized.js'
import { TokenService } from '../service/token.service.js'
import { Cookies } from '../util/Enums/Cookies.enum.js'

export class AuthMiddleware {
  //TODO
  middleware(req: Request, res: Response, next: NextFunction) {
    const tokenService = new TokenService()
    const token = tokenService.verifyAccessToken(req.cookies[Cookies.AccessToken])
    if (!token) {
      throw new Unauthorized()
    }
    res.locals.token = token
    next()
  }
}
