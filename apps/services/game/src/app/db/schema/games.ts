import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { InferModel } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

export type TGame = InferModel<typeof games>
export const games = pgTable('games', {
  id: serial('id').primaryKey().unique(),
  playerName: text('playerName').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  questionIds: integer('questionIds').notNull().array().notNull(),
  score: integer('score').default(0),
  finishedAt: timestamp('finishedAt'),
})

export const insertGameSchema = createInsertSchema(games)
