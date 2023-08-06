import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { OpenaiService } from './openai/openai.service'
import { Logger } from '@nestjs/common'
import { DbService } from './db/db.service'

const data = [
  {
    question: 'What is optional chaining?',
    answers: [
      'A way to access properties on an object that may not exist',
      "A way to access properties on an object that may not exist, and if it doesn't exist, return undefined",
      "A way to access properties on an object that may not exist, and if it doesn't exist, return null",
      "A way to access properties on an object that may not exist, and if it doesn't exist, return an empty string",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'What would this code return?',
    snippet: '1 + "1"',
    answers: ['"11"', '2', '"2"', '11'],
    correctAnswerIndex: 0,
  },
]

describe('AppController', () => {
  let appController: AppController
  let openaiService: jest.Mocked<OpenaiService>
  let dbService: jest.Mocked<DbService>

  beforeEach(async () => {
    openaiService = {
      generateQuestionsPrompt: jest.fn(),
    } as any

    dbService = {
      saveQuestions: jest.fn(),
    } as any

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: DbService,
          useValue: dbService,
        },
        {
          provide: OpenaiService,
          useValue: openaiService,
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('generate', () => {
    it('should generate questions', async () => {
      const count = 10

      openaiService.generateQuestionsPrompt.mockResolvedValue(
        JSON.stringify(data),
      )

      await appController['generate']({ count })

      expect(openaiService.generateQuestionsPrompt).toBeCalledWith(count)
      expect(dbService.saveQuestions).toBeCalledWith(data)
    })
  })
})
