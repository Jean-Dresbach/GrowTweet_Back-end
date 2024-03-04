import { randomUUID } from "crypto"

import { repository } from "../database/prisma.connection"
import { ResponseDTO } from "../dtos/response.dto"

export class AuthService {
  public async login(
    emailOrUsername: string,
    password: string
  ): Promise<ResponseDTO> {
    const user = await repository.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        password
      }
    })

    if (!user) {
      return {
        code: 400,
        message: "Credenciais inválidas."
      }
    }

    const token = randomUUID()
    const userId = user.id

    await repository.user.update({
      where: {
        id: user.id
      },
      data: {
        token
      }
    })

    return {
      code: 200,
      message: "Login realizado com sucesso.",
      data: { token, userId }
    }
  }

  public async logout(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findFirst({
      where: { id }
    })

    if (!user) {
      return {
        code: 400,
        message: "Credenciais inválidas."
      }
    }

    await repository.user.update({
      where: {
        id: user.id
      },
      data: {
        token: ""
      }
    })

    return {
      code: 200,
      message: "Logout realizado com sucesso."
    }
  }
}
