import { Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
    },
  })

  await app.listen()
  Logger.log(`🟢 Questions service is up!`)
}

bootstrap()
