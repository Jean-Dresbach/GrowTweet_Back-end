import express from "express"

import { FollowController } from "../controllers/follow.controller"
import { validateLoginToken } from "../middlewares/auth.middleware"
import { validateFollowCreate } from "../middlewares/follow.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const followController = new FollowController()

router.get(
  "/follows/:userId",
  validateId,
  validateLoginToken,
  followController.index
)

router.get(
  "/follows/user/:userId/:followedId?",
  validateId,
  validateLoginToken,
  followController.indexById
)

router.post(
  "/follows/:userId",
  validateId,
  validateLoginToken,
  validateFollowCreate,
  followController.store
)

router.get(
  "/follows/:userId/:followId",
  validateId,
  validateLoginToken,
  followController.show
)

router.delete(
  "/follows/:userId/:followId",
  validateId,
  validateLoginToken,
  followController.delete
)

export default router
