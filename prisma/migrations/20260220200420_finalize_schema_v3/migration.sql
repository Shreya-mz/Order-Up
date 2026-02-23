/*
  Warnings:

  - You are about to drop the column `image` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `foodCourtId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `fcId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_foodCourtId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "image",
DROP COLUMN "isAvailable";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "foodCourtId",
ADD COLUMN     "fcId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fcId_fkey" FOREIGN KEY ("fcId") REFERENCES "FoodCourt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
