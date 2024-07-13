/*
  Warnings:

  - You are about to drop the column `userId` on the `Liked` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Liked` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_userId_fkey";

-- DropIndex
DROP INDEX "Liked_postId_authorId_key";

-- AlterTable
ALTER TABLE "Liked" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Liked_id_key" ON "Liked"("id");

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
