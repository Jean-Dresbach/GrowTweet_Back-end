import express from "express"

import { UserController } from "../controllers/user.controller"
import { validateUserCreate } from "../middlewares/user.middleware"
import { validateId } from "../middlewares/validateId.middleware"

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.index)

router.post("/users", validateUserCreate, userController.store)

router.get("/users/:userId", validateId, userController.show)

router.put("/users/:userId", validateId, userController.update)

router.delete("/users/:userId", validateId, userController.delete)

export default router
