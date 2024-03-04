import express from "express"

import { ReplyController } from "../controllers/reply.controller"
import { validateLoginToken } from "../middlewares/auth.middleware"
import { validateReplyCreate } from "../middlewares/reply.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const replyController = new ReplyController()

router.get(
  "/replies/:userId",
  validateId,
  validateLoginToken,
  replyController.index
)

router.get(
  "/replies/user/:userId",
  validateId,
  validateLoginToken,
  replyController.indexByUserId
)

router.get(
  "/replies/:userId/:tweetId",
  validateId,
  validateLoginToken,
  replyController.indexByTweetId
)

router.post(
  "/replies/:userId",
  validateId,
  validateLoginToken,
  validateReplyCreate,
  replyController.store
)

router.get(
  "/replies/user/:userId/:replyId",
  validateId,
  validateLoginToken,
  replyController.show
)

router.put(
  "/replies/:userId/:replyId",
  validateId,
  validateLoginToken,
  replyController.update
)

router.delete(
  "/replies/:userId/:replyId",
  validateId,
  validateLoginToken,
  replyController.delete
)

export default router
