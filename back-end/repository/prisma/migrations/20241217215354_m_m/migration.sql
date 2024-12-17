/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_employeeId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "_EmployeeToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToOrder_AB_unique" ON "_EmployeeToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToOrder_B_index" ON "_EmployeeToOrder"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToOrder" ADD CONSTRAINT "_EmployeeToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToOrder" ADD CONSTRAINT "_EmployeeToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
