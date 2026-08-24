/*
  Warnings:

  - You are about to drop the column `userId` on the `folder` table. All the data in the column will be lost.
  - Made the column `organizationId` on table `folder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_userId_fkey";

-- DropIndex
DROP INDEX "folder_userId_idx";

-- AlterTable
ALTER TABLE "folder" DROP COLUMN "userId",
ADD COLUMN     "memberId" TEXT,
ALTER COLUMN "organizationId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "folder_memberId_idx" ON "folder"("memberId");

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
