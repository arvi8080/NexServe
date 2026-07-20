/*
  Warnings:

  - You are about to drop the column `isOnline` on the `ProfessionalLocation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('OFFLINE', 'ONLINE', 'BUSY');

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "assignedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ProfessionalLocation" DROP COLUMN "isOnline",
ADD COLUMN     "status" "AvailabilityStatus" NOT NULL DEFAULT 'OFFLINE';
