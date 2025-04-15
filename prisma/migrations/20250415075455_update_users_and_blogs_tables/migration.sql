/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondary_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "blog_image_url" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "profile_photo_url" TEXT,
ADD COLUMN     "secondary_email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_secondary_email_key" ON "users"("secondary_email");
