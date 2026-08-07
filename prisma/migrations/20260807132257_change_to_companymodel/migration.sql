/*
  Warnings:

  - You are about to drop the column `adress` on the `Company` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('OWNER', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyRole" "CompanyRole";
