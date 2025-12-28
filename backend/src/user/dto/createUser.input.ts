import { Field, InputType } from '@nestjs/graphql';
import { Block, Grade } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(Block)
  block: Block;

  @Field()
  @IsNotEmpty()
  @IsEnum(Grade)
  grade: Grade;
}
