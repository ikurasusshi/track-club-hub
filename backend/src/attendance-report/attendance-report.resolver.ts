import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendanceReportService } from './attendance-report.service';
import { AttendanceReport } from '@prisma/client';
import { AttendanceReport as AttendanceReportModel } from './models/attendanceReport.model';
import { CreateAttendanceReportInput } from './dto/createAttendanceReport.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class AttendanceReportResolver {
  constructor(
    private readonly attendanceReportService: AttendanceReportService,
  ) {}

  @Query(() => [AttendanceReportModel])
  @UseGuards(JwtAuthGuard)
  async getAttendanceReports(
    @Args('block', { nullable: true }) block?: string,
  ): Promise<AttendanceReport[]> {
    return await this.attendanceReportService.getAttendanceReports(block);
  }

  @Mutation(() => AttendanceReportModel)
  @UseGuards(JwtAuthGuard)
  async createAttendanceReport(
    @Args('createAttendanceReportInput')
    createAttendanceReportInput: CreateAttendanceReportInput,
  ): Promise<AttendanceReport> {
    return await this.attendanceReportService.createAttendanceReport(
      createAttendanceReportInput,
    );
  }
}
