import { CustomError } from './CustomError.js'

export class ServiceUnavailable extends CustomError {
  constructor(message: string = 'Service Unavailable', errorCode: number = 503, originalError?: Error) {
    super(message, 503, errorCode, originalError)
  }
}
