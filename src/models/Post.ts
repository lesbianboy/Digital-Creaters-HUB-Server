import mongoose, { Document, Schema, Types } from 'mongoose'
import { IPost } from '../interface/postInterface.js'

export interface IPostModel extends IPost, Document {}

const Post: Schema = new Schema(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      reqried: true,
      ref: 'User',
    },
    images: [
      {
        fileName: {
          type: String,
          required: true,
        },
        file: {
          data: Buffer,
          contentType: String,
        },
        uploadTime: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: {
      type: String,
      ref: 'Tag',
      lowercase: true,
    },
    content: {
      type: String,
    },
  },
  {
    collection: 'Post',
    timestamps: true,
  },
)

export default mongoose.model<IPostModel>('Post', Post)
