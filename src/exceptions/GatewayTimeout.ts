import { CustomError } from './CustomError.js'

export class GatewayTimeout extends CustomError {
  constructor(message: string = 'Gateway Timeout', errorCode: number = 504, originalError?: Error) {
    super(message, 504, errorCode, originalError)
  }
}
