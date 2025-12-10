import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompetitionReportService } from './competition-report.service';
import { CompetitionReport } from '@prisma/client';
import { CompetitionReport as CompetitionReportModel } from './models/competitionReport.model';
import { CreateCompetitionReportInput } from 'src/competition-report/dto/createCompetitionReport.input';
import { UpdateCompetitionReportInput } from './dto/updateCompetitionReport.input';

@Resolver()
export class CompetitionReportResolver {
  constructor(
    private readonly competitionReportService: CompetitionReportService,
  ) {}

  @Query(() => [CompetitionReportModel])
  async getCompetitionReports(): Promise<CompetitionReport[]> {
    return await this.competitionReportService.getCompetitionReports();
  }

  @Query(() => [CompetitionReportModel])
  async getMyCompetitionReports(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<CompetitionReport[]> {
    return await this.competitionReportService.getMyCompetitionReports(userId);
  }

  @Mutation(() => CompetitionReportModel)
  async createCompetitionReport(
    @Args('createCompetitionReportInput')
    createCompetitionReportInput: CreateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    return await this.competitionReportService.createCompetitionReport(
      createCompetitionReportInput,
    );
  }

  @Mutation(() => CompetitionReportModel)
  async updateCompetitionReport(
    @Args('updateCompetitionReportInput')
    updateCompetitionReportInput: UpdateCompetitionReportInput,
  ): Promise<CompetitionReport> {
    return await this.competitionReportService.updateCompetitionReport(
      updateCompetitionReportInput,
    );
  }
}
