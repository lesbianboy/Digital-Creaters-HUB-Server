import { Types } from 'mongoose'
import { IImage } from './imageInterface.js'
import { ITag } from './tagInterface.js'

export interface IPost {
  owned_id: Types.ObjectId
  picture: Array<IImage>
  tags: Array<ITag>
  content: string
}
