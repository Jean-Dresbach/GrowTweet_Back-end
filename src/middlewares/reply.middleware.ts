import { NextFunction, Request, Response } from "express"

export async function validateReplyCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { content, repliedTweetId } = request.body

    if (!content || !repliedTweetId) {
      return response.status(400).json({
        code: 400,
        message: "Preencha todos os campos obrigatórios."
      })
    }

    if (repliedTweetId.length < 36 || repliedTweetId.length > 36) {
      return response.status(400).json({
        code: 400,
        message: "RepliedTweetId inválido."
      })
    }

    next()
  } catch (error) {
    console.log(error)

    return response.status(500).json({
      code: 500,
      message: `Erro interno do servidor.`
    })
  }
}
