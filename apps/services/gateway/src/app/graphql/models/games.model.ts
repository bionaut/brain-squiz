import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Game {
  @Field()
  id: string

  @Field()
  playerName: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  finishedAt?: Date

  @Field(() => Int)
  score: number

  @Field(() => [String])
  questionIds: string[]
}
