import { Module } from '@nestjs/common';
import { AttendanceReportResolver } from './attendance-report.resolver';
import { AttendanceReportService } from './attendance-report.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AttendanceReportResolver, AttendanceReportService],
})
export class AttendanceReportModule {}
