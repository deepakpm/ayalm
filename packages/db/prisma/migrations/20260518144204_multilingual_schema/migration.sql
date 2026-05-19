/*
  Warnings:

  - You are about to drop the column `description` on the `Deity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Deity` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Offering` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Offering` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Temple` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Temple` table. All the data in the column will be lost.
  - You are about to drop the column `highlights` on the `Temple` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Temple` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Temple` table. All the data in the column will be lost.
  - You are about to drop the column `timings` on the `Temple` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TranslationLocale" AS ENUM ('EN', 'TA', 'HI');

-- CreateEnum
CREATE TYPE "TimeType" AS ENUM ('MORNING', 'EVENING');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "Deity" DROP CONSTRAINT "Deity_templeId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_templeId_fkey";

-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_templeId_fkey";

-- DropForeignKey
ALTER TABLE "Offering" DROP CONSTRAINT "Offering_templeId_fkey";

-- AlterTable
ALTER TABLE "Deity" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Offering" DROP COLUMN "description",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Temple" DROP COLUMN "city",
DROP COLUMN "description",
DROP COLUMN "highlights",
DROP COLUMN "name",
DROP COLUMN "state",
DROP COLUMN "timings",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- CreateTable
CREATE TABLE "TempleTranslation" (
    "id" TEXT NOT NULL,
    "templeId" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT,
    "history" TEXT,
    "landmark" TEXT,

    CONSTRAINT "TempleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempleHighlight" (
    "id" TEXT NOT NULL,
    "templeId" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TempleHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timings" (
    "id" TEXT NOT NULL,
    "templeId" TEXT NOT NULL,
    "timeType" "TimeType" NOT NULL DEFAULT 'MORNING',
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "day" "Day",

    CONSTRAINT "Timings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeityTranslation" (
    "id" TEXT NOT NULL,
    "deityId" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT,

    CONSTRAINT "DeityTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTranslation" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "EventTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingTranslation" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "locale" "TranslationLocale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "OfferingTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "templeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempleTranslation_templeId_locale_key" ON "TempleTranslation"("templeId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "DeityTranslation_deityId_locale_key" ON "DeityTranslation"("deityId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "EventTranslation_eventId_locale_key" ON "EventTranslation"("eventId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "OfferingTranslation_offeringId_locale_key" ON "OfferingTranslation"("offeringId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_templeId_userId_key" ON "Rating"("templeId", "userId");

-- AddForeignKey
ALTER TABLE "TempleTranslation" ADD CONSTRAINT "TempleTranslation_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempleHighlight" ADD CONSTRAINT "TempleHighlight_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timings" ADD CONSTRAINT "Timings_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deity" ADD CONSTRAINT "Deity_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeityTranslation" ADD CONSTRAINT "DeityTranslation_deityId_fkey" FOREIGN KEY ("deityId") REFERENCES "Deity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTranslation" ADD CONSTRAINT "EventTranslation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingTranslation" ADD CONSTRAINT "OfferingTranslation_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
