/*
  Warnings:

  - You are about to drop the `followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followed_id_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_fkey";

-- DropTable
DROP TABLE "followers";

-- CreateTable
CREATE TABLE "follows" (
    "id" UUID NOT NULL,
    "followed_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "crated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
