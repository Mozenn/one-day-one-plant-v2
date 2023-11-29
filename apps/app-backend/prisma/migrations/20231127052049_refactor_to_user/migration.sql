/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MemberToPlant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_lastDrawPlantId_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToPlant" DROP CONSTRAINT "_MemberToPlant_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToPlant" DROP CONSTRAINT "_MemberToPlant_B_fkey";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "_MemberToPlant";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "profilePlantUrl" TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg/796px-Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "lastDrawDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastDrawPlantId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToPlant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToPlant_AB_unique" ON "_UserToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToPlant_B_index" ON "_UserToPlant"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastDrawPlantId_fkey" FOREIGN KEY ("lastDrawPlantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToPlant" ADD CONSTRAINT "_UserToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToPlant" ADD CONSTRAINT "_UserToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
