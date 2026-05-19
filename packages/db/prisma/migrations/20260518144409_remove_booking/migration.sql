/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_offeringId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bookingId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Transaction";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "PaymentGateway";

-- DropEnum
DROP TYPE "TransactionStatus";
