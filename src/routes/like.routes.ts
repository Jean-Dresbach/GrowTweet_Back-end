import express from "express"

import { LikeController } from "../controllers/like.controler"
import { validateLoginToken } from "../middlewares/auth.middleware"
import { validateLikeCreate } from "../middlewares/like.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const likeController = new LikeController()

router.get(
  "/likes/:userId",
  validateId,
  validateLoginToken,
  likeController.index
)

router.get(
  "/likes/user/:userId",
  validateId,
  validateLoginToken,
  likeController.indexById
)

router.post(
  "/likes/:userId",
  validateId,
  validateLoginToken,
  validateLikeCreate,
  likeController.store
)

router.get(
  "/likes/:userId/:likeId",
  validateId,
  validateLoginToken,
  likeController.show
)

router.delete(
  "/likes/:userId/:likeId",
  validateId,
  validateLoginToken,
  likeController.delete
)

export default router
