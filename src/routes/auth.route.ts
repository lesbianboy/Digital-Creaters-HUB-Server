import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controller/auth.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

export class AuthRoutes {
  router: Router
  public authController: AuthController = new AuthController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post(
      '/signup',
      // body('email').isEmail(),
      // body('password').isLength({ min: 8, max: 16 }),
      this.authController.signup,
    )
    this.router.post('/signin', this.authController.signin)
    this.router.post('/signout', this.authController.signout)
    this.router.post('/refresh', this.authController.refresh)
  }
}
