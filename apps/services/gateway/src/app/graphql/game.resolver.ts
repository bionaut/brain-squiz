import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { Inject, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Game } from './models/games.model'
import { Question } from './models/questions.model'
import { map, switchMap, tap } from 'rxjs/operators'

@Resolver(() => Game)
export class GameResolver {
  constructor(
    @Inject('GAME_SERVICE') private gameClient: ClientProxy,
    @Inject('QUESTIONS_SERVICE') private questionClient: ClientProxy,
    @Inject('PLAYER_SERVICE') private playerClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Query(() => Game)
  game(@Args('id') id: string) {
    return this.gameClient.send('get-game', { id })
  }

  @Mutation(() => Game)
  createGame(@Args('playerName') playerName: string) {
    return this.questionClient.send('get-questions', { limit: 10 }).pipe(
      map((questions: Question[]) => questions.map((question) => question.id)),
      switchMap((questionIds) =>
        this.gameClient.send('create-game', {
          playerName,
          questionIds,
        }),
      ),
    )
  }

  @Mutation(() => Game)
  async finishGame(
    @Args('id') id: string,
    @Args('score') score: number,
    @Args('playerName') playerName: string,
  ) {
    await this.playerClient
      .send('update-score', { playerName, score })
      .toPromise()
    return this.gameClient.send('finish-game', { id, score })
  }

  @ResolveField('createdAt', () => Date)
  createdAt(@Parent() game: Game) {
    return new Date(game.createdAt)
  }

  @ResolveField('elapsedTime', () => Number)
  elapsedTime(@Parent() game: Game) {
    const createdAt = new Date(game.createdAt)
    const finishedAt = new Date(game.finishedAt)
    return (finishedAt.getTime() - createdAt.getTime()) / 1000
  }
}
