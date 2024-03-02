import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateUserDTO } from "../dtos/user.dto"

export class UserService {
  public async findAll(): Promise<ResponseDTO> {
    const users = await repository.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    return {
      code: 200,
      message: "Us"
    }
  }

  public async create(userDTO: CreateUserDTO): Promise<ResponseDTO> {
    const createdStudent = await repository.user.create({
      data: {
        name: userDTO.name,
        email: userDTO.email,
        username: userDTO.username,
        password: userDTO.password
      }
    })

    return {
      code: 201,
      message: "Usuário criado com sucesso.",
      data: createdStudent
    }
  }
}
