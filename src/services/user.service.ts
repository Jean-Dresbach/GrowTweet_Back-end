import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"

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
      message: "Usuários listados com sucesso.",
      data: users
    }
  }

  public async create(userDTO: CreateUserDTO): Promise<ResponseDTO> {
    const existingUser = await repository.user.findFirst({
      where: {
        OR: [{ email: userDTO.email }, { username: userDTO.username }]
      }
    })

    if (existingUser) {
      if (existingUser.email === userDTO.email) {
        return {
          code: 409,
          message: "Email já cadastrado."
        }
      } else {
        return {
          code: 409,
          message: "Username já cadastrado."
        }
      }
    }

    const createdStudent = await repository.user.create({
      data: {
        name: userDTO.name,
        email: userDTO.email,
        username: userDTO.username,
        password: userDTO.password
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    return {
      code: 201,
      message: "Usuário criado com sucesso.",
      data: createdStudent
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    return {
      code: 200,
      message: "Usuário encontrado com sucesso.",
      data: user
    }
  }

  public async update(userDTO: UpdateUserDTO): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: {
        id: userDTO.userId
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    const updatedUser = await repository.user.update({
      where: {
        id: userDTO.userId
      },
      data: {
        name: userDTO.name,
        email: userDTO.email,
        username: userDTO.username,
        password: userDTO.password
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    return {
      code: 200,
      message: "Usuário atualizado com sucesso.",
      data: updatedUser
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado."
      }
    }

    const deletedUser = await repository.user.delete({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    return {
      code: 200,
      message: "Usuário removido com sucesso.",
      data: deletedUser
    }
  }
}
