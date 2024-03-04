import { NextFunction, Request, Response } from "express"

export async function validateFollowCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { followedId } = request.body

    if (!followedId) {
      return response.status(400).json({
        code: 400,
        message: "Preencha todos os campos obrigatórios."
      })
    }

    if (followedId.length < 36 || followedId.length > 36) {
      return response.status(400).json({
        code: 400,
        message: "FollowedId inválido."
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
