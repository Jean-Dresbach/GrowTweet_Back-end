import { Request, Response } from "express"

import { UserService } from "../services/user.service"
import { CreateUserDTO } from "../dtos/user.dto"

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

  public async store(request: Request, response: Response) {
    try {
      const { name, email, username, password } = request.body

      const user: CreateUserDTO = { name, email, username, password }

      const result = await userService.create(user)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao criar usuário: ${error.message}.`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await userService.findById(id)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao buscar usuário: ${error.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { name, email, username, password } = request.body

      const result = await userService.update({
        id,
        name,
        email,
        username,
        password
      })

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao buscar usuário: ${error.message}`
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await userService.delete(id)

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao excluir usuário: ${error.message}`
      })
    }
  }
}
