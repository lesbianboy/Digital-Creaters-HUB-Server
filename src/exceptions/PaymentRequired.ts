import { CustomError } from './CustomError.js'

export class PaymentRequired extends CustomError {
  constructor(message: string = 'Payment Required', errorCode: number = 402, originalError?: Error) {
    super(message, 402, errorCode, originalError)
  }
}
