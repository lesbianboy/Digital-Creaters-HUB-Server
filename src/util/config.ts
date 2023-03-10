/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
dotenv.config()
export const config = {
  isProduction: process.env.NODE_ENV! === 'production',
  clientUrl: process.env.CLIENT_URL!,
  baseDomain: process.env.BASE_DOMAIN!,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,

  mongoURL: process.env.MONGODB_URL!,
  mongoUser: process.env.MONGODB_USER!,
  mongoPassword: process.env.MONGODB_PASSWORD!,
  mongoDatabase: process.env.MONGODB_DATABASE!,
}
