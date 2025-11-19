import { Injectable } from '@nestjs/common';
import { CompetitionReport } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompetitionReportInput } from './dto/createCompetitionReport.input';
import { UpdateCompetitionReportInput } from './dto/updateCompetitionReport.input';

@Injectable()
export class CompetitionReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCompetitionReports(): Promise<CompetitionReport[]> {
    return await this.prismaService.competitionReport.findMany();
  }

  async getMyCompetitionReports(userId: number): Promise<CompetitionReport[]> {
    return await this.prismaService.competitionReport.findMany({
      where: { userId },
    });
  }

  async createCompetitionReport(
    createCompetitionReportInput: CreateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    const { body, userId } = createCompetitionReportInput;
    return await this.prismaService.competitionReport.create({
      data: { body, userId },
    });
  }

  async updateCompetitionReport(
    updateCompetitionReportInput: UpdateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    const { id, body } = updateCompetitionReportInput;
    return await this.prismaService.competitionReport.update({
      data: { id, body },
      where: { id },
    });
  }
}
