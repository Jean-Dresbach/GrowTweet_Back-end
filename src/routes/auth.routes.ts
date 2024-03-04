import express from "express"

import { AuthController } from "../controllers/auth.controller"
import { validateId } from "../middlewares/validateId.middleware"
import { validateLoginToken } from "../middlewares/auth.middleware"

const router = express.Router()

const authController = new AuthController()

router.post("/login", authController.login)

router.post(
  "/logout/:userId",
  validateId,
  validateLoginToken,
  authController.logout
)

export default router
