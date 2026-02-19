import { Injectable } from '@nestjs/common';
import { CompetitionReport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompetitionReportInput } from './dto/createCompetitionReport.input';
import { UpdateCompetitionReportInput } from './dto/updateCompetitionReport.input';

@Injectable()
export class CompetitionReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCompetitionReports(): Promise<CompetitionReport[]> {
    return await this.prismaService.competitionReport.findMany({
      include: { user: true },
    });
  }

  async getMyCompetitionReports(userId: number): Promise<CompetitionReport[]> {
    return await this.prismaService.competitionReport.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async createCompetitionReport(
    createCompetitionReportInput: CreateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    const { competitionName, body, userId } = createCompetitionReportInput;
    return await this.prismaService.competitionReport.create({
      data: { competitionName, body, userId },
    });
  }

  async updateCompetitionReport(
    updateCompetitionReportInput: UpdateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    const { id, competitionName, body } = updateCompetitionReportInput;
    return await this.prismaService.competitionReport.update({
      data: { id, competitionName, body },
      where: { id },
    });
  }
}
