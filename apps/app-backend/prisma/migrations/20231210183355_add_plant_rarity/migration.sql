-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'ULTRA_RARE');

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "rarity" "Rarity" NOT NULL DEFAULT 'COMMON';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastDrawDate" SET DEFAULT NOW() - interval '1 day';
