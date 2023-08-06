import zod from 'zod'

export const envSchema = zod.object({
  PORT: zod.string(),
  NODE_ENV: zod.string(),
  DB_USER: zod.string(),
  DB_PASSWORD: zod.string(),
  DB_HOST: zod.string(),
  DB_PORT: zod.string(),
  DB_NAME: zod.string(),
})
