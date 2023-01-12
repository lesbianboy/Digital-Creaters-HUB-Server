import { Console } from 'console'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result.js'
import { Unauthorized } from '../exceptions/Unauthorized.js'
import User, { IUserModel } from '../models/User.js'
import { AuthService } from '../service/auth.service.js'
import { TokenService } from '../service/token.service.js'
import { Cookies } from '../util/Enums/Cookies.enum.js'

export class AuthController {
  public authService: AuthService = new AuthService()
  public tokenService: TokenService = new TokenService()
  constructor() {
    this.signup = this.signup.bind(this)
    this.signin = this.signin.bind(this)
    this.signout = this.signout.bind(this)
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      // const validationErrors = validationResult(req)
      // if (!validationErrors.isEmpty()) {
      //   throw new Unauthorized('Invalid email or password')
      // }
      const { email, username, password } = req.body
      const user = await this.authService.signup(email, username, password)
      const tokens = this.tokenService.generateTokens(user)
      // TODO mail service
      const signupData = await this.tokenService.setTokens(res, tokens.accessToken, user, tokens.refreshToken)
      return res.json(signupData)
    } catch (e) {
      next(e)
    }
  }
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await this.authService.signin(email, password)
      const tokens = this.tokenService.generateTokens(user)
      // TODO mail service
      const signinData = await this.tokenService.setTokens(res, tokens.accessToken, user, tokens.refreshToken)
      return res.json(signinData)
    } catch (e) {
      next(e)
    }
  }
  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      await this.tokenService.clearTokens(res, req.cookies[Cookies.RefreshToken])
    } catch (e) {
      next(e)
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const current = this.tokenService.verifyRefreshToken(req.cookies[Cookies.RefreshToken])
      const user = await User.findById(current.userId)
      if (!user) throw new Unauthorized()
    } catch (e) {
      next(e)
    }
  }
}
