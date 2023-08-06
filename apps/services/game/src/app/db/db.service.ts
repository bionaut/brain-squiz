import postgres from 'postgres'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { games, insertGameSchema, TGame } from './schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class DbService {
  private readonly client: postgres.Sql<
    Record<string, postgres.PostgresType> extends {} ? {} : any
  >
  private db: PostgresJsDatabase<Record<string, never>>

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {
    const DB_HOST = 'game-db'
    const DB_PORT = config.getOrThrow('DB_PORT')
    const DB_USER = config.getOrThrow('DB_USER')
    const DB_PASSWORD = config.getOrThrow('DB_PASSWORD')
    const DB_NAME = config.getOrThrow('DB_NAME')

    const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable&ssl=false`

    this.client = postgres(connectionString, {
      ssl: 'require',
    })

    this.db = drizzle(this.client)

    // test the connection
    this.client`SELECT 1`
      .then(() => {
        this.logger.log('🟢 Successfully connected to database')
      })
      .catch((err) => {
        this.logger.error('🔴 Failed to connect to database')
        this.logger.error(err)
      })

    // migrate the database
    migrate(this.db, {
      migrationsFolder: 'apps/services/game/src/app/db/schema/migrations',
    })
      .then(() => {
        this.logger.log('🟢 Successfully migrated database')
      })
      .catch((err) => {
        this.logger.error('🔴 Failed to migrate database')
        throw err
      })
  }

  public async createGame(playerName: string, questionIds: string[]) {
    const game = insertGameSchema.parse({
      playerName,
      questionIds,
      createdAt: new Date(),
      score: 0,
    }) as TGame

    const newGame = await this.db
      .insert(games)
      .values(game)
      .returning()
      .execute()

    if (newGame.length === 0) {
      return null
    }

    return newGame[0]
  }

  public async getGame(id: number) {
    const matched = await this.db
      .select()
      .from(games)
      .where(eq(games.id, id))
      .execute()

    if (matched.length === 0) {
      return null
    }

    return matched[0]
  }

  public async finishGame(id: number, score: number) {
    const game = await this.getGame(id)

    if (!game) {
      throw new Error(`Game with id ${id} not found`)
    }

    const updatedGame = await this.db
      .update(games)
      .set({
        score,
        finishedAt: new Date(),
      })
      .where(eq(games.id, id))
      .returning()
      .execute()

    if (updatedGame.length === 0) {
      return null
    }

    return updatedGame[0]
  }
}
