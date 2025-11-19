import { Injectable } from '@nestjs/common';
import { AttendanceReport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttendanceReportInput } from './dto/createAttendanceReport.input';

@Injectable()
export class AttendanceReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAttendanceReports(): Promise<AttendanceReport[]> {
    return await this.prismaService.attendanceReport.findMany();
  }

  async createAttendanceReport(
    createAttendanceReportInput: CreateAttendanceReportInput,
  ): Promise<AttendanceReport> {
    const { date, status, reason, userId } = createAttendanceReportInput;
    return await this.prismaService.attendanceReport.create({
      data: {
        date,
        status,
        reason,
        userId,
      },
    });
  }
}
