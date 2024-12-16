/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_houseId_fkey";

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Belgium',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "houseNumber" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
