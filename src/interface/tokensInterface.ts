import { Types } from 'mongoose'

export interface IToken {
  user_id: Types.ObjectId
  refreshToken: string
  createdAT: Date
}

export interface AccessTokenPayload {
  userId: Types.ObjectId
}

export interface AccessToken extends AccessTokenPayload {
  exp: number
}

export interface RefreshTokenPayload {
  userId: Types.ObjectId
}

export interface RefreshToken extends RefreshTokenPayload {
  exp: number
}
