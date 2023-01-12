import { CookieOptions, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { InternalServerError } from '../exceptions/InternalServerError.js'
import { AccessToken, AccessTokenPayload, RefreshToken, RefreshTokenPayload } from '../interface/tokensInterface.js'
import { IUser } from '../interface/userInterface.js'
import Token from '../models/Token.js'
import { IUserModel } from '../models/User.js'
import { config } from '../util/config.js'
import { Cookies } from '../util/Enums/Cookies.enum.js'

export enum TokenExpiration {
  Access = 5 * 60,
  Refresh = 7 * 24 * 60 * 60,
  RefreshIfLessThan = 4 * 24 * 60 * 60,
}

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: config.isProduction ? 'strict' : 'lax',
  domain: config.baseDomain,
  path: '/',
}

const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000,
}

export class TokenService {
  signAccessToken(payload: AccessTokenPayload) {
    try {
      return jwt.sign(payload, config.accessTokenSecret, { expiresIn: TokenExpiration.Access })
    } catch (e) {
      throw new InternalServerError('Access Token Signing failed')
    }
  }

  signRefreshToken(payload: RefreshTokenPayload) {
    try {
      return jwt.sign(payload, config.refreshTokenSecret, { expiresIn: TokenExpiration.Refresh })
    } catch (e) {
      throw new InternalServerError('Refresh Token Signing failed')
    }
  }

  generateTokens(user: IUserModel) {
    const accessPayload: AccessTokenPayload = { userId: user._id }
    const refreshPayload: RefreshTokenPayload = { userId: user._id }

    const accessToken = this.signAccessToken(accessPayload)
    const refreshToken = refreshPayload && this.signRefreshToken(refreshPayload)

    return { accessToken, refreshToken }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.refreshTokenSecret) as RefreshToken
    } catch (e) {
      throw new InternalServerError('Refresh Token Verification failed')
    }
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, config.accessTokenSecret) as AccessToken
    } catch (e) {
      throw new InternalServerError('Access Token Verification failed')
    }
  }

  async setTokens(res: Response, access: string, user?: IUserModel, refresh?: string) {
    res.cookie(Cookies.AccessToken, access, accessTokenCookieOptions)
    if (user && refresh) {
      let tokenData = await Token.findOne({ user: user._id })
      if (tokenData) {
        tokenData.refreshToken = refresh
        return tokenData.save()
      }
      tokenData = await Token.create({ user: user._id, refreshToken: refresh })
      return tokenData
    }
  }

  //TODO: refresh token function
  async refreshTokens(current: RefreshToken) {
    const accessPayload: AccessTokenPayload = { userId: current.userId }
    let refreshPayload: RefreshTokenPayload | undefined
    const tokenData = await Token.findById(current.userId)
    tokenData?.createdAT

    const expiration = new Date(current.exp * 1000)
    const now = new Date()
    const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000

    if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
      refreshPayload = { userId: current.userId }
    }

    const accessToken = this.signAccessToken(accessPayload)
    const refreshToken = refreshPayload && this.signRefreshToken(refreshPayload)

    return { accessToken, refreshToken }
  }

  async clearTokens(res: Response, refreshToken: string) {
    res.cookie(Cookies.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 })
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
  }
}
