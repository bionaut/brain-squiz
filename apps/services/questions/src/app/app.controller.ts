import { Controller, Get, Logger } from '@nestjs/common'
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
  async generate(count: number = 10) {
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
}
