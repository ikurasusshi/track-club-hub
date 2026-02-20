import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { User } from '../../user/models/user.model';

@ObjectType()
export class AttendanceReportDate {
  @Field()
  date: Date;
}

@ObjectType()
export class AttendanceReport {
  @Field(() => Int)
  id: number;

  @Field()
  date: Date;

  @Field()
  status: Status;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;
}
