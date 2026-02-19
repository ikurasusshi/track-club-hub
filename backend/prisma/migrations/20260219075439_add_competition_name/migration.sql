-- AlterTable
ALTER TABLE "CompetitionReport" ADD COLUMN "competitionName" VARCHAR(255) NOT NULL DEFAULT '';

-- Remove default after backfill
ALTER TABLE "CompetitionReport" ALTER COLUMN "competitionName" DROP DEFAULT;
