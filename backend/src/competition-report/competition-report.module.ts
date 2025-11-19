import { Module } from '@nestjs/common';
import { CompetitionReportResolver } from './competition-report.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompetitionReportService } from './competition-report.service';

@Module({
  imports: [PrismaModule],
  providers: [CompetitionReportResolver, CompetitionReportService],
})
export class CompetitionReportModule {}
