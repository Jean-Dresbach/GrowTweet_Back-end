import { NextFunction, Request, Response } from "express"

import { repository } from "../database/prisma.connection"

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

    const existingUser = await repository.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }]
      }
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return response.status(409).json({
          code: 409,
          message: "Email já cadastrado."
        })
      } else {
        return response.status(409).json({
          code: 409,
          message: "Username já cadastrado."
        })
      }
    }

    next()
  } catch (error) {
    return response.status(500).json({
      code: 500,
      message: "Erro."
    })
  }
}
