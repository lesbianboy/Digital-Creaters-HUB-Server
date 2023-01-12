import mongoose, { Document, Schema } from 'mongoose'
import { ITag } from '../interface/tagInterface.js'

export interface ITagModel extends ITag, Document {}

const Tag: Schema = new Schema(
  {
    tag: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  {
    collection: 'Tag',
    timestamps: true,
  },
)

export default mongoose.model<ITagModel>('Tag', Tag)
