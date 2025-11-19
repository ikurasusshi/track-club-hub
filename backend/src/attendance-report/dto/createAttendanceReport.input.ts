import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAttendanceReportInput {
  @Field()
  date: Date;

  @Field()
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Int)
  userId: number;
}
