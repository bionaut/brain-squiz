import { Controller, Logger } from '@nestjs/common'

import { DbService } from './db/db.service'
import { MessagePattern } from '@nestjs/microservices'
import { TInsertPlayer, insertPlayerSchema, TPlayer } from './db/schema'

@Controller()
export class AppController {
  constructor(
    private readonly dbService: DbService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('create-player')
  async createPlayer({ name }: TInsertPlayer) {
    const data = insertPlayerSchema.parse({ name, score: 0 })

    // check if player exists
    const player = await this.dbService.getPlayer(data.name)
    if (player) {
      this.logger.log(`Player ${data.name} already exists`)
      return player
    }

    // create a player if it doesn't exist
    this.logger.log(`Creating player ${data.name}`)
    return this.dbService.createPlayer(data as TPlayer)
  }

  @MessagePattern('get-player')
  async getPlayer({ name }: TPlayer) {
    this.logger.log(`Getting player ${name}`)
    return await this.dbService.getPlayer(name)
  }

  @MessagePattern('top-players')
  async topPlayers({ limit }: { limit: number }) {
    this.logger.log(`Getting top players`)
    return await this.dbService.getTopPlayers(limit)
  }
}
