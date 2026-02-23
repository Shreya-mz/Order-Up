/*
  Warnings:

  - You are about to drop the column `name` on the `Campus` table. All the data in the column will be lost.
  - You are about to drop the column `stallId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `stallId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Stall` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[campusNumber]` on the table `Campus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campusNumber` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodCourtId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodCourtId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_stallId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_stallId_fkey";

-- DropForeignKey
ALTER TABLE "Stall" DROP CONSTRAINT "Stall_campusId_fkey";

-- AlterTable
ALTER TABLE "Campus" DROP COLUMN "name",
ADD COLUMN     "campusNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "stallId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "foodCourtId" TEXT NOT NULL,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stallId",
ADD COLUMN     "foodCourtId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Stall";

-- CreateTable
CREATE TABLE "FoodCourt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "campusId" TEXT NOT NULL,

    CONSTRAINT "FoodCourt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campus_campusNumber_key" ON "Campus"("campusNumber");

-- AddForeignKey
ALTER TABLE "FoodCourt" ADD CONSTRAINT "FoodCourt_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_foodCourtId_fkey" FOREIGN KEY ("foodCourtId") REFERENCES "FoodCourt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_foodCourtId_fkey" FOREIGN KEY ("foodCourtId") REFERENCES "FoodCourt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
