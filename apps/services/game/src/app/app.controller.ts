import { Controller, Logger } from '@nestjs/common'

import { DbService } from './db/db.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(
    private readonly dbService: DbService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('create-game')
  async createGame(data: { playerName: string; questionIds: string[] }) {
    const { playerName, questionIds } = data
    this.logger.log(`Creating game for ${playerName} with ${questionIds}`)
    return this.dbService.createGame(playerName, questionIds)
  }

  @MessagePattern('get-game')
  async getGame(data: { id: number }) {
    const { id } = data
    this.logger.log(`Getting game with id ${id}`)
    return this.dbService.getGame(id)
  }

  @MessagePattern('finish-game')
  async updateGame(data: { id: number; score: number }) {
    const { id, score } = data
    this.logger.log(`Finishing game with id ${id}`)
    return this.dbService.finishGame(id, score)
  }
}
