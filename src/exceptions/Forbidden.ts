import { CustomError } from './CustomError.js'

export class Forbidden extends CustomError {
  constructor(message: string = 'Forbiden', errorCode: number = 403, originalError?: Error) {
    super(message, 403, errorCode, originalError)
  }
}
