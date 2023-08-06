import zod from 'zod'

export const envSchema = zod.object({
  PORT: zod.string(),
  NODE_ENV: zod.string(),
})
