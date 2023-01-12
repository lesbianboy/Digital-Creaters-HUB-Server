declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      NODE_ENV: string
      BASE_DOMAIN: string
      CLIENT_URL: string

      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string

      MONGODB_URL: string
      MONGODB_USER: string
      MONGODB_PASSWORD: string
      MONGODB_DATABASE: string
    }
  }
}
