import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { InferModel } from 'drizzle-orm'
import { z } from 'zod'

export type TPlayer = InferModel<typeof players>
export const players = pgTable('players', {
  name: text('name').primaryKey().unique(),
  score: integer('score'),
})

export type TInsertPlayer = z.infer<typeof insertPlayerSchema>
export const insertPlayerSchema = createInsertSchema(players)
