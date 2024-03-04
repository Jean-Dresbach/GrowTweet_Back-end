import { NextFunction, Request, Response } from "express"

export async function validateLikeCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { tweetId } = request.body

    if (!tweetId) {
      return response.status(400).json({
        code: 400,
        message: "Preencha todos os campos obrigatórios."
      })
    }

    if (tweetId.length < 36 || tweetId.length > 36) {
      return response.status(400).json({
        code: 400,
        message: "TweetId inválido."
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
