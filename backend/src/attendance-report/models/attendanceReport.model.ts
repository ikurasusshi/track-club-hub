import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

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
}
