import { Configuration, OpenAIApi } from 'openai'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { generateQuestions } from './questions-prompt'

@Injectable()
export class OpenaiService {
  private api: OpenAIApi

  constructor(
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {
    const configuration = new Configuration({
      organization: config.getOrThrow('OPENAI_ORG_ID'),
      apiKey: config.getOrThrow('OPENAI_API_KEY'),
    })
    this.api = new OpenAIApi(configuration)
  }

  async generateQuestionsPrompt(count: number = 10): Promise<string> {
    const messages = generateQuestions(count)

    const result = await this.api
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })
      .catch((err) => {
        this.logger.error('Prompt failed')
        throw err
      })

    const resultString = (result as any)?.data?.choices?.[0]?.message?.content

    if (!resultString || resultString.length === 0) {
      throw new Error('Invalid response from OpenAI')
    }

    return resultString
  }
}
