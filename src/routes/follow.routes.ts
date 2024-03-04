import express from "express"

import { FollowController } from "../controllers/follow.controller"
import { validateLoginToken } from "../middlewares/auth.middleware"
import { validateFollowCreate } from "../middlewares/follow.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const followController = new FollowController()

router.get(
  "/follow/:userId",
  validateId,
  validateLoginToken,
  followController.index
)

router.get(
  "/follow/user/:userId",
  validateId,
  validateLoginToken,
  followController.indexById
)

router.post(
  "/follow/:userId",
  validateId,
  validateLoginToken,
  validateFollowCreate,
  followController.store
)

router.get(
  "/follow/:userId/:followId",
  validateId,
  validateLoginToken,
  followController.show
)

router.delete(
  "/follow/:userId/:followId",
  validateId,
  validateLoginToken,
  followController.delete
)

export default router
