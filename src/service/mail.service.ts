import nodeMailer, { TestAccount } from 'nodemailer'
import { MailInterface } from '../interface/MailInterface.js'

export class MailService {
  private static instance: MailService
  private transporter!: nodeMailer.Transporter

  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService()
    }
    return MailService.instance
  }
  async createLocalConnection() {
    const account: TestAccount = await nodeMailer.createTestAccount()
    this.transporter = nodeMailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
  }
  async sendMail(requestId: string | number | string[], options: MailInterface) {
    return await this.transporter
      .sendMail({
        from: `"" ${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        return info
      })
  }
  async verifyConnection() {
    return this.transporter.verify()
  }
  getTransporter() {
    return this.transporter
  }
}

module.exports = new MailService()
