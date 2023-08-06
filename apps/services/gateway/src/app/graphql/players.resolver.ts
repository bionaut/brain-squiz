import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Player } from './models/players.model'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Resolver(() => Player)
export class PlayersResolver {
  constructor(@Inject('PLAYER_SERVICE') private playerClient: ClientProxy) {}

  @Query((returns) => [Player])
  async topPlayers(@Args('limit') limit: number) {
    return this.playerClient.send('top-players', { limit })
  }

  @Query((returns) => Player, { nullable: true })
  async player(@Args('name') name: string) {
    return this.playerClient.send('get-player', { name })
  }

  @Mutation(() => Player)
  async createPlayer(@Args('name') name: string) {
    return this.playerClient.send('create-player', { name })
  }
}
