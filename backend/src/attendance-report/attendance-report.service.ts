import { Injectable } from '@nestjs/common';
import { AttendanceReport, Block } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttendanceReportInput } from './dto/createAttendanceReport.input';

@Injectable()
export class AttendanceReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAttendanceReports(block?: string) {
    return await this.prismaService.attendanceReport.findMany({
      where: block
        ? {
            user: {
              block: block as Block,
            },
          }
        : undefined,
      include: {
        user: true,
      },
    });
  }

  async getAbsentDates(userId: number, since: Date) {
    return await this.prismaService.attendanceReport.findMany({
      where: {
        userId,
        date: { gte: since },
        status: 'ABSENT',
      },
      select: { date: true },
      orderBy: { date: 'asc' },
    });
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