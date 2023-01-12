import { CustomError } from './CustomError.js'

export class ProxyAuthenticationRequired extends CustomError {
  constructor(message: string = 'Proxy Authentication Required', errorCode: number = 407, originalError?: Error) {
    super(message, 407, errorCode, originalError)
  }
}
