-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "lastDrawDate" SET DEFAULT NOW() - interval '1 day';
