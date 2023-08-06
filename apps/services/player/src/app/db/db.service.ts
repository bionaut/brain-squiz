import postgres from 'postgres'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { eq, desc } from 'drizzle-orm'

import { players, TPlayer } from './schema'

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
    const DB_HOST = 'player-db'
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
      migrationsFolder: 'apps/services/player/src/app/db/schema/migrations',
    })
      .then(() => {
        this.logger.log('🟢 Successfully migrated database')
      })
      .catch((err) => {
        this.logger.error('🔴 Failed to migrate database')
        throw err
      })
  }

  public async createPlayer(data: TPlayer) {
    await this.db.insert(players).values(data).execute()
    return this.getPlayer(data.name)
  }

  public async getPlayer(name: string): Promise<TPlayer> {
    const matched = await this.db
      .select()
      .from(players)
      .where(eq(players.name, name))
      .execute()

    if (matched.length === 0) {
      return null
    }

    return matched[0]
  }

  public async getTopPlayers(limit: number): Promise<TPlayer[]> {
    return await this.db
      .select()
      .from(players)
      .orderBy(desc(players.score))
      .limit(limit)
      .execute()
  }
}
