import { CustomError } from './CustomError.js'

export class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error', errorCode: number = 500, originalError?: Error) {
    super(message, 500, errorCode, originalError)
  }
}
