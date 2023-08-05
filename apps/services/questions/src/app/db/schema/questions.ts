import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { InferModel } from 'drizzle-orm'

export type TQuestion = InferModel<typeof questions>
export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answers: text('answers').notNull().array().notNull(),
  correctAnswerIndex: integer('correct_answer_index').notNull(),
  snippet: text('snippet'),
})

export const insertQuestionsSchema = createInsertSchema(questions)
