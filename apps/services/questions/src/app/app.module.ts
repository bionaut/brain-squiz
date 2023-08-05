import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { envSchema } from '../env-schema'
import { OpenaiService } from './openai/openai.service'
import { DbService } from './db/db.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [OpenaiService, Logger, DbService],
})
export class AppModule {}
