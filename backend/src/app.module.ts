import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AttendanceReportModule } from './attendance-report/attendance-report.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompetitionReportModule } from './competition-report/competition-report.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AttendanceReportModule,
    PrismaModule,
    CompetitionReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
