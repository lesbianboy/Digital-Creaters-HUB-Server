import mongoose, { Document, Schema } from 'mongoose'

export interface ICategoryModel extends Document {
  category: string
}

const Category: Schema = new Schema(
  {
    category: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  {
    _id: false,
    collection: 'Category',
    timestamps: true,
  },
)

export default mongoose.model<ICategoryModel>('Category', Category)
