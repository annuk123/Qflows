/*
  Warnings:

  - The primary key for the `Testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Testimonial_id_seq";
