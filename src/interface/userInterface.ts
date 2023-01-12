import { Types } from 'mongoose'
import { IImage } from './imageInterface.js'

export interface IUser {
  username: string
  avatar: {
    fileName: string
    file: Types.Buffer
    uploadTime: Date
  }
  name: string
  surname: string
  email: string
  password: string
  sex: string
  dateOfbirth: Date
  address: [
    {
      country: string
      city: string
    },
  ]
  contactInfo: {
    urls: [
      {
        url: string
      },
    ]
    email: string
    phonenumber: string
  }
  postitions: [
    {
      position_name: string
      position_description: string
      dateStart: number
      dateEnd: Date
      current: boolean
      address: string
    },
  ]
  languages: [
    {
      name: string
      level: string
    },
  ]
  education: [
    {
      degree: string
      school: string
      fieldOfStudy: string
      enrolledAt: Date
      finished: Date
      grades: number
      activities: string
      description: string
    },
  ]
  skills: [string]
  tabs: [Types.ObjectId]
  posts: [Types.ObjectId]
  roles: [Types.ObjectId]
  status: string
}
