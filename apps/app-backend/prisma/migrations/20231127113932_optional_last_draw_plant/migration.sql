-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lastDrawPlantId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastDrawDate" SET DEFAULT NOW() - interval '1 day',
ALTER COLUMN "lastDrawPlantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastDrawPlantId_fkey" FOREIGN KEY ("lastDrawPlantId") REFERENCES "Plant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
