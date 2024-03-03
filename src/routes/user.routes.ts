import express from "express"

import { UserController } from "../controllers/user.controller"
import {
  validateUserCreate,
  validateUserId
} from "../middlewares/user.middleware"

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.index)

router.post("/users", validateUserCreate, userController.store)

router.get("/users/:id", validateUserId, userController.show)

router.put("/users/:id", validateUserId, userController.update)

router.delete("/users/:id", validateUserId, userController.delete)

export default router
