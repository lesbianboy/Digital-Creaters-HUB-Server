import User from '../models/User.js'
import bcrypt from 'bcrypt'
import Role from '../models/Role.js'
import { InternalServerError } from '../exceptions/InternalServerError.js'
import { NotFound } from '../exceptions/NotFound.js'
import { Unauthorized } from '../exceptions/Unauthorized.js'

export class AuthService {
  async signup(email: string, username: string, password: string) {
    const candidate = await User.findOne({ email })
    if (candidate) {
      console.log(candidate)
      throw new NotFound(`User with ${email} already exits`)
    }

    const saltPower: number = 8
    const hashPassowrd = await bcrypt.hash(password, saltPower)
    const userRole = await Role.findOne({ role: 'user' })
    if (!userRole) throw new InternalServerError()
    const user = await User.create({ email, username, password: hashPassowrd, roles: [userRole.role] })
    return user
  }
  async signin(email: string, password: string) {
    const user = await User.findOne({ email })
    if (!user) throw new Unauthorized(`User with ${email} not found`)
    const passwordValidation = bcrypt.compareSync(password, user.password)
    if (!passwordValidation) {
      throw new Unauthorized(`Invalid password`)
    }
    return user
  }
}
