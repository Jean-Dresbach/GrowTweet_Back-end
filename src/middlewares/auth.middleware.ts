import { NextFunction, Request, Response } from "express"
import { repository } from "../database/prisma.connection"

export async function validateLoginToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers
    const { userId } = request.params

    if (!authorization) {
      return response.status(400).json({
        code: 400,
        message: "Token de autenticação não informado."
      })
    }

    if (authorization.length > 36 || authorization.length < 36) {
      return response.status(400).json({
        code: 400,
        message: "Token de autenticação inválido."
      })
    }

    const user = await repository.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return response.status(404).json({
        code: 404,
        message: "Usuário não encontrado."
      })
    }

    if (user.token !== authorization) {
      return response.status(401).json({
        code: 401,
        message: "Token de autenticação inválido."
      })
    }

    next()
  } catch (error: any) {
    return response.status(500).json({
      code: 500,
      message: `Erro: ${error.message}`
    })
  }
}
