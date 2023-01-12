import mongoose, { Document, Schema } from 'mongoose'
import { IRole } from '../interface/roleinterface.js'

export interface IRoleModel extends IRole, Document {}

const Role: Schema = new Schema(
  {
    role: {
      type: String,
      unique: true,
      default: 'user',
      lowercase: true,
    },
  },
  {
    collection: 'Role',
    timestamps: true,
  },
)

export default mongoose.model<IRoleModel>('Role', Role)
