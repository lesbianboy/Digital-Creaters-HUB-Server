import { CustomError } from './CustomError.js'

export class NotImplemented extends CustomError {
  constructor(message: string = 'Not Implemented', errorCode: number = 501, originalError?: Error) {
    super(message, 501, errorCode, originalError)
  }
}
