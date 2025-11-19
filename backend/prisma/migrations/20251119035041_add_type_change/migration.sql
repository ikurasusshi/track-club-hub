/*
  Warnings:

  - You are about to drop the `AttendanceReports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompetitionReports` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Block" ADD VALUE 'Others';

-- DropForeignKey
ALTER TABLE "AttendanceReports" DROP CONSTRAINT "AttendanceReports_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompetitionReports" DROP CONSTRAINT "CompetitionReports_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "AttendanceReports";

-- DropTable
DROP TABLE "CompetitionReports";

-- CreateTable
CREATE TABLE "AttendanceReport" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "status" "Status" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AttendanceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionReport" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CompetitionReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceReport_userId_date_key" ON "AttendanceReport"("userId", "date");

-- AddForeignKey
ALTER TABLE "AttendanceReport" ADD CONSTRAINT "AttendanceReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionReport" ADD CONSTRAINT "CompetitionReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
