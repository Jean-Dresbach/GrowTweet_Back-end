import { Request, Response } from "express"

import { UserService } from "../services/user.service"
import { CreateUserDTO } from "../dtos/user.dto"

const userService = new UserService()

export class UserController {
  public async index(request: Request, response: Response) {
    try {
      const users = await userService.findAll()

      return response.status(users.code).json(users)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { name, email, username, password } = request.body

      const user: CreateUserDTO = { name, email, username, password }

      const result = await userService.create(user)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await userService.findById(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { name, email, username, password } = request.body

      const result = await userService.update({
        userId,
        name,
        email,
        username,
        password
      })

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await userService.delete(userId)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }
}
