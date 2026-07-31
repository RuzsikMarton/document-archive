/*
  Warnings:

  - You are about to drop the column `accessCode` on the `folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "folder" DROP COLUMN "accessCode",
ADD COLUMN     "monthFrom" INTEGER,
ADD COLUMN     "monthTo" INTEGER,
ADD COLUMN     "transferCode" TEXT;
