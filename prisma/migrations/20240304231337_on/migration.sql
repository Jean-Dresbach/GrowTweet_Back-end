-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_tweet_id_fkey";

-- DropForeignKey
ALTER TABLE "re_tweets" DROP CONSTRAINT "re_tweets_re_tweeted_id_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_replied_tweet_id_fkey";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_replied_tweet_id_fkey" FOREIGN KEY ("replied_tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "re_tweets" ADD CONSTRAINT "re_tweets_re_tweeted_id_fkey" FOREIGN KEY ("re_tweeted_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
