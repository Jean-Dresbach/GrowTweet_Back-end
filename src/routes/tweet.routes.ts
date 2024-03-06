import express from "express"

import { TweetController } from "../controllers/tweet.controller"
import { validateLoginToken } from "../middlewares/auth.middleware"
import { validateTweetCreate } from "../middlewares/tweet.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const tweetController = new TweetController()

router.get(
  "/tweets/:userId",
  validateId,
  validateLoginToken,
  tweetController.index
)

router.get(
  "/tweets/user/:userId",
  validateId,
  validateLoginToken,
  tweetController.indexById
)

router.get(
  "/tweets/feed/:userId",
  validateId,
  validateLoginToken,
  tweetController.showFeed
)

router.post(
  "/tweets/:userId",
  validateId,
  validateLoginToken,
  validateTweetCreate,
  tweetController.store
)

router.get(
  "/tweets/:userId/:tweetId",
  validateId,
  validateLoginToken,
  tweetController.show
)

router.put(
  "/tweets/:userId/:tweetId",
  validateId,
  validateLoginToken,
  tweetController.update
)

router.delete(
  "/tweets/:userId/:tweetId",
  validateId,
  validateLoginToken,
  tweetController.delete
)

export default router
