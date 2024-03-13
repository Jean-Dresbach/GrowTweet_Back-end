import { Request, Response } from "express"

import { AuthService } from "../services/auth.service"

const authService = new AuthService()

export class AuthController {
  public async login(request: Request, response: Response) {
    try {
      const emailOrUsername = request.body.emailOrUsername.trim()
      const password = request.body.password.trim()

      request.body.emailOrUsername = emailOrUsername
      request.body.password = password

      if (!emailOrUsername || !password) {
        return response.status(400).json({
          code: response.statusCode,
          message: "Preencha os campos obrigatórios."
        })
      }

      const result = await authService.login(emailOrUsername, password)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async logout(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await authService.logout(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }
}
