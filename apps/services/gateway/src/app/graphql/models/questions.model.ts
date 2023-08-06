import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Question {
  @Field()
  id: string

  @Field()
  question: string

  @Field(() => [String])
  answers: string[]

  @Field(() => Int)
  correctAnswerIndex: number

  @Field({ nullable: true })
  snippet?: string
}
