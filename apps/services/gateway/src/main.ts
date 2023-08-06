import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port)
  Logger.log(`🟢 Gateway is running on: http://localhost:${port}}`)
}

bootstrap()
