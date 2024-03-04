import { NextFunction, Request, Response } from "express"

export async function validateTweetCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { content } = request.body

    if (!content) {
      return response.status(400).json({
        code: 400,
        message: "Preencha todos os campos obrigatórios."
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
