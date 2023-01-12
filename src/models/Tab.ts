import mongoose, { Document, Schema } from 'mongoose'
import { IPostModel } from './Post.js'

export interface ITabModel extends Document {
  name: string
  owner_id: string
  posts: Array<IPostModel>
  tags: Array<string>
}

const Tab: Schema = new Schema(
  {
    owner_id: { type: Schema.Types.ObjectId, reqried: true },
    name: { type: String, reuired: true },
    category: { type: String, ref: 'Category', lowercase: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    collection: 'Tab',
    timestamps: true,
  },
)

export default mongoose.model<ITabModel>('Tab', Tab)
