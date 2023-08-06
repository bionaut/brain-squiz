import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Player {
  @Field()
  name: string

  @Field(() => Int)
  score: number
}
