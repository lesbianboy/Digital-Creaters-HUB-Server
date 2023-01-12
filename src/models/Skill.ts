import mongoose, { Document, Schema } from 'mongoose'

export interface ISkillModel extends Document {
  skill: string
}

const Skill: Schema = new Schema(
  {
    skill: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  {
    collection: 'Skill',
    timestamps: true,
  },
)

export default mongoose.model<ISkillModel>('Skill', Skill)
