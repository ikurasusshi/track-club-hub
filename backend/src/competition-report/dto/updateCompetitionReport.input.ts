import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateCompetitionReportInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  body?: string;
}
