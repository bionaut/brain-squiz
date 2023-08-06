import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { envSchema } from '../env-schema'
import { DbService } from './db/db.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [Logger, DbService],
})
export class AppModule {}
