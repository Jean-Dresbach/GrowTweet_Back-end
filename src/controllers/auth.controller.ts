import { Request, Response } from "express"

import { AuthService } from "../services/auth.service"

const authService = new AuthService()

export class AuthController {
  public async login(request: Request, response: Response) {
    try {
      const { emailOrUsername, password } = request.body

      if (!emailOrUsername || !password) {
        return response.status(400).json({
          code: response.statusCode,
          message: "Preencha os campos obrigatórios."
        })
      }

      const result = await authService.login(emailOrUsername, password)

      return response.status(200).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: response.statusCode,
        message: `Erro ao fazer login: ${error.message}`
      })
    }
  }

  public async logout(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await authService.logout(userId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: response.statusCode,
        message: `Erro ao fazer login: ${error.message}`
      })
    }
  }
}
