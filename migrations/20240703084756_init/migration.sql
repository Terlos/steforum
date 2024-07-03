/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Liked` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId,authorId]` on the table `Liked` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_authorId_fkey";

-- AlterTable
ALTER TABLE "Liked" DROP COLUMN "createdAt",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Liked_postId_authorId_key" ON "Liked"("postId", "authorId");

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
