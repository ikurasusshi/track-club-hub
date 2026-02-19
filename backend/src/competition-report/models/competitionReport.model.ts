import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class CompetitionReport {
  @Field(() => Int)
  id: number;

  @Field()
  competitionName: string;

  @Field()
  body: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;
}
