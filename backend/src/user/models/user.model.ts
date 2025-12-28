import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Block, Grade } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  block: Block;

  @Field()
  grade: Grade;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
