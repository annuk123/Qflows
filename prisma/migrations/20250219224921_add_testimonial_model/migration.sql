-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
