/*
  Warnings:

  - The values [OWNER,EMPLOYEE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[ico]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dic]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "adress" TEXT,
ADD COLUMN     "dic" TEXT,
ADD COLUMN     "ico" TEXT;

-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "companyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_ico_key" ON "Company"("ico");

-- CreateIndex
CREATE UNIQUE INDEX "Company_dic_key" ON "Company"("dic");

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
