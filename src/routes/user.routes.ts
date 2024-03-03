import express from "express"

import { UserController } from "../controllers/user.controller"
import { validateUserCreate } from "../middlewares/user.middleware"

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.index)

router.post("/users", validateUserCreate, userController.store)

router.get("/users/:id", userController.show)

router.put("/users/:id", userController.update)

router.delete("/users/:id", userController.delete)

export default router
