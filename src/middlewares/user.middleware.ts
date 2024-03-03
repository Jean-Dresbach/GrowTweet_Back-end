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
    return response.status(500).json({
      code: 500,
      message: "Erro."
    })
  }
}

export async function validateUserId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params
    ;("b730eb79-59a8-4004-b7ea-ae8788f3896b")
    if (id.length < 36 || id.length > 36)
      return response.status(400).json({
        code: 400,
        message: "Id inválido."
      })

    next()
  } catch (error: any) {
    return response.status(500).json({
      code: 500,
      message: `Erro: ${error.message}`
    })
  }
}
