import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Question } from './models/questions.model'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { GraphQLError } from 'graphql/error'

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(
    @Inject('QUESTIONS_SERVICE') private questionsClient: ClientProxy,
  ) {}

  @Query((returns) => [Question])
  async questions(@Args('limit', { nullable: true }) limit?: number) {
    try {
      return this.questionsClient.send('getQuestions', {
        limit,
      })
    } catch (error) {
      throw new GraphQLError('Error getting questions')
    }
  }

  @Mutation(() => String)
  async generateQuestions(@Args('count') count: number) {
    this.questionsClient.emit('generate', { count })
    return `Generating ${count} questions in the background`
  }
}
