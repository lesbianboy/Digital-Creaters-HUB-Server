import mongoose, { Document, Schema, Types } from 'mongoose'
import { IImage } from '../interface/imageInterface.js'
import { IUser } from '../interface/userInterface.js'
import { AccountStatus } from '../util/Enums/AccountStatus.js'
import { LenguageLevel } from '../util/Enums/LanguageLevel.js'
import { SexType } from '../util/Enums/Sex.js'

export interface IUserModel extends IUser, Document {
  _id: Types.ObjectId
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    avatar: {
      fileName: {
        type: String,
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
    name: { type: String },
    surname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sex: { type: String, enum: Object.values(SexType) },
    dateOfbirth: { type: Date },
    address: [
      {
        country: { type: String },
        city: { type: String },
      },
    ],
    contactInfo: {
      urls: [
        {
          url: { type: String },
        },
      ],
      email: { type: String },
      phonenumber: { type: String },
    },
    postitions: [
      {
        position_name: { type: String },
        position_description: { type: String },
        dateStart: { type: Date },
        dateEnd: { type: Date },
        current: { type: Boolean },
        address: { type: String },
      },
    ],
    languages: [
      {
        name: { type: String },
        level: {
          type: String,
          enum: Object.values(LenguageLevel),
          required: true,
        },
      },
    ],
    education: [
      {
        degree: { type: String },
        school: { type: String },
        fieldOfStudy: { type: String },
        enrolledAt: { type: Date },
        finished: { type: Date },
        grades: { type: Number },
        activities: { type: String },
        description: { type: String },
      },
    ],
    skills: [{ type: String, ref: 'Skill' }],
    tabs: [{ type: Schema.Types.ObjectId, ref: 'Tab' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    roles: [{ type: String, ref: 'Role', required: true }],
    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: 'inactive',
    },
  },
  {
    collection: 'User',
    timestamps: true,
  },
)

export default mongoose.model<IUserModel>('User', UserSchema)
