import type { Config } from 'drizzle-kit'

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable&ssl=false`

export default {
  schema: './apps/services/questions/src/app/db/schema',
  out: './apps/services/questions/src/app/db/schema/migrations',
  dbCredentials: {
    connectionString,
  },
} satisfies Config
