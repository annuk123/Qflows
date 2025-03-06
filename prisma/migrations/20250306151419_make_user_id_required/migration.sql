/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Testimonial` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_userId_key" ON "Testimonial"("userId");
