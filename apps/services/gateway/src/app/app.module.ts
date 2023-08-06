import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '../env-schema'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { QuestionsResolver } from './graphql/questions.resolver'
import { PlayersResolver } from './graphql/players.resolver'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      {
        name: 'QUESTIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'questions',
          port: 3000,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'PLAYER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'player',
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [QuestionsResolver, PlayersResolver],
})
export class AppModule {}
