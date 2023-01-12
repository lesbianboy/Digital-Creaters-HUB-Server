import mongoose, { Document, Schema, Types } from 'mongoose'
import { IToken } from '../interface/tokensInterface.js'
import { TokenExpiration } from '../service/token.service.js'

export interface ITokenModel extends IToken, Document {}

const Token: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expiresAfterSeconds: 604800 },
    },
  },
  {
    collection: 'Token',
  },
)

export default mongoose.model<ITokenModel>('Token', Token)
