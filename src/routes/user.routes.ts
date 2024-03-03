import express from "express"

import { UserController } from "../controllers/user.controller"
import {
  validateUserCreate,
  validateGetUser
} from "../middlewares/user.middleware"

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.index)

router.post("/users", validateUserCreate, userController.store)

router.get("/users/:id", validateGetUser, userController.show)

router.put("/users/:id", userController.update)

router.delete("/users/:id", userController.delete)

export default router
