import express from "express"

import { UserController } from "../controllers/user.controller"

const router = express.Router()

const userController = new UserController()

router.get("/users", userController.index)

router.post("/users", userController.store)

router.get("/users/:id", userController.show)

router.put("/users/:id", userController.update)

router.delete("/users/:id", userController.delete)

export default router
