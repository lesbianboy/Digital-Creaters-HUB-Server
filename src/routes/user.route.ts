import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controller/auth.controller.js'

export class UserRoutes {
  router: Router
  //public userController: UserController = new UserController()

  constructor() {
    this.router = Router()
    //this.routes()
  }
  //   routes() {
  //     this.get()
  //   }
}
