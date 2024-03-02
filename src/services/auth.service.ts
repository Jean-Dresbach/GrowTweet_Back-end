import { randomUUID } from "crypto"

import { repository } from "../database/prisma.connection"
import { ResponseDTO } from "../dtos/response.dto"

export class AuthService {
  public async login(email: string, password: string): Promise<ResponseDTO> {
    const student = await repository.user.findFirst({
      where: {
        email,
        password
      }
    })

    if (!student) {
      throw new Error("Credenciais inválidas")
    }

    const token = randomUUID()
    const userId = student.id

    await repository.user.update({
      where: {
        id: student.id
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
}
