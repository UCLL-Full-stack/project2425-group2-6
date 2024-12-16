/*
  Warnings:

  - A unique constraint covering the columns `[houseId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `houseId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "houseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_houseId_key" ON "Address"("houseId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
