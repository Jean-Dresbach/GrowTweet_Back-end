import { Request, Response } from "express"

import { UserService } from "../services/user.service"

const userService = new UserService()

export class UserController {
  public async index(request: Request, response: Response) {
    try {
      const users = await userService.findAll()

      return response.status(users.code).json(users)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar usuários: ${error.message}`
      })
    }
  }
}
