import { Controller, Logger } from '@nestjs/common'
import { EventPattern, MessagePattern } from '@nestjs/microservices'

import { DbService } from './db/db.service'
import { OpenaiService } from './openai/openai.service'
import { insertQuestionsSchema, TQuestion } from './db/schema'

@Controller()
export class AppController {
  constructor(
    private readonly dbService: DbService,
    private readonly openaiService: OpenaiService,
    private readonly logger: Logger,
  ) {}

  @EventPattern('generate')
  async generate(data: { count: number }) {
    const { count } = data

    if (!count) {
      throw new Error('Count must be provided')
    }

    if (typeof data.count !== 'number') {
      throw new Error('Count must be a number')
    }

    this.logger.log(`Generating ${count} questions`)
    const questions = await this.openaiService.generateQuestionsPrompt(count)

    this.logger.log('Parsing questions')
    const json = JSON.parse(questions) as TQuestion[]
    const questionsArray = json.map((q) =>
      insertQuestionsSchema.parse(q),
    ) as TQuestion[]

    this.logger.log('Saving questions')
    await this.dbService.saveQuestions(questionsArray)
  }

  @MessagePattern('get-questions')
  async getQuestions(data: { limit: number }) {
    const { limit } = data

    if (!limit) {
      throw new Error('Limit must be provided')
    }

    if (typeof data.limit !== 'number') {
      throw new Error('Limit must be a number')
    }

    this.logger.log(`Getting ${limit} questions`)
    return await this.dbService.getQuestions(limit)
  }

  @MessagePattern('get-question')
  async getQuestion(data: { id: string }) {
    const { id } = data

    if (!id) {
      throw new Error('Id must be provided')
    }

    this.logger.log(`Getting question ${id}`)
    return await this.dbService.getQuestion(Number(id))
  }
}
