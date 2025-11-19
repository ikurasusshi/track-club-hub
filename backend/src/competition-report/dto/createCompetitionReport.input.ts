import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCompetitionReportInput {
  @Field()
  @IsNotEmpty()
  body: string;

  @Field(() => Int)
  userId: number;
}
