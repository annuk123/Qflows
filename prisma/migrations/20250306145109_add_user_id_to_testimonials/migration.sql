/*
  Warnings:

  - The primary key for the `Testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN "userId" TEXT;


