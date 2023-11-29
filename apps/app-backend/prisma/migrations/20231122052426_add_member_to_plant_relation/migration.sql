-- CreateTable
CREATE TABLE "_MemberToPlant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToPlant_AB_unique" ON "_MemberToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToPlant_B_index" ON "_MemberToPlant"("B");

-- AddForeignKey
ALTER TABLE "_MemberToPlant" ADD CONSTRAINT "_MemberToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToPlant" ADD CONSTRAINT "_MemberToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
