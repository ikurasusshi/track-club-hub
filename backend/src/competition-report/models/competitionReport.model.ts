import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompetitionReport {
  @Field(() => Int)
  id: number;

  @Field()
  body: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
