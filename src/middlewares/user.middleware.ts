import { NextFunction, Request, Response } from "express"

export async function validateUserCreate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, email, username, password } = request.body

    if (!name || !email || !username || !password) {
      return response.status(400).json({
        code: 400,
        message: "Preencha todos os campos obrigatórios."
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
