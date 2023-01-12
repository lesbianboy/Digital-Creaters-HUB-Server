import express, { Response, Request, NextFunction } from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import cors from 'cors'
//errors
import { InternalServerError } from './exceptions/InternalServerError.js'
//config
import { config } from './util/config.js'
//routes
import { AuthRoutes } from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import { UserRoutes } from './routes/user.route.js'
import { AuthMiddleware } from './middleware/auth.middleware.js'
import { CustomError } from './exceptions/CustomError.js'

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.mongo()
  }

  public routes(): void {
    // HealthCheck
    const msg: string = `Server is running on port ${this.app.get('port')}`
    this.app.get('/api/ping', (req: Request, res: Response) => res.status(200).json({ message: msg }))

    this.app.use('/api/auth', new AuthRoutes().router)
    this.app.use('/api/user', new AuthMiddleware().middleware, new UserRoutes().router)
    //this.app.use('/api/user', new AuthRoutes().router)
    //Error Handling
    this.app.use((err: Error, req: Request, res: Response) => {
      console.error(err)
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message, errors: err.errorCode })
      }
    })
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(compression())
    this.app.use(cors())
  }

  private mongo() {
    mongoose.set('strictQuery', false)
    const connection = mongoose.connection
    //connection state
    connection.on('connected', () => {
      console.log('Mongo Connection Established')
    })
    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestablished')
    })
    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected')
      console.log('Trying to reconnect to Mongo ...')
      setTimeout(() => {
        mongoose.connect(config.mongoURL, {
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
        })
      }, 3000)
    })
    connection.on('close', () => {
      console.log('Mongo Connection Closed')
    })
    connection.on('error', (error: Error) => {
      throw new InternalServerError('Unable to connect to the server', 500, error)
    })
    //connecting
    const run = async () => {
      await mongoose.connect(config.mongoURL, {
        keepAlive: true,
      })
    }
    run().catch((error) => console.error(error))
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`API is running at ${this.app.get('port')}`)
    })
  }
}

const server = new Server()

server.start()
