import { Field, InputType, Int } from '@nestjs/graphql';
import { Block, Grade } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  grade: Grade;

  @Field()
  @IsNotEmpty()
  block: Block;
}
