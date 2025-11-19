import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendanceReportService } from './attendance-report.service';
import { AttendanceReport } from '@prisma/client';
import { AttendanceReport as AttendanceReportModel } from './models/attendanceReport.model';
import { CreateAttendanceReportInput } from './dto/createAttendanceReport.input';

@Resolver()
export class AttendanceReportResolver {
  constructor(
    private readonly attendanceReportService: AttendanceReportService,
  ) {}

  @Query(() => [AttendanceReportModel])
  async getAttendanceReports(): Promise<AttendanceReport[]> {
    return await this.attendanceReportService.getAttendanceReports();
  }

  @Mutation(() => AttendanceReportModel)
  async createAttendanceReport(
    @Args('createAttendanceReportInput')
    createAttendanceReportInput: CreateAttendanceReportInput,
  ): Promise<AttendanceReport> {
    return await this.attendanceReportService.createAttendanceReport(
      createAttendanceReportInput,
    );
  }
}
