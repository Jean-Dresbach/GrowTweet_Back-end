import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateFollowDTO } from "../dtos/follow.dto"

export class FollowService {
  public async findAll(): Promise<ResponseDTO> {
    const follows = await repository.follow.findMany({
      select: {
        id: true,
        followedId: true,
        followerId: true
      }
    })

    return {
      code: 200,
      message: "Follows listados com sucesso.",
      data: follows
    }
  }

  public async findAllById(id: string): Promise<ResponseDTO> {
    const follows = await repository.follow.findMany({
      where: {
        followedId: id
      },
      select: {
        id: true,
        followedId: true,
        followerId: true
      }
    })

    return {
      code: 200,
      message: "Follows do usuário listados com sucesso.",
      data: follows
    }
  }

  public async create(followDTO: CreateFollowDTO): Promise<ResponseDTO> {
    const checkFollowedId = await repository.user.findUnique({
      where: { id: followDTO.followedId }
    })

    if (!checkFollowedId) {
      return {
        code: 404,
        message: "Usuário a ser seguido não encontrado!"
      }
    }

    const createdFollow = await repository.follow.create({
      data: {
        followedId: followDTO.followedId,
        followerId: followDTO.followerId
      },
      select: {
        id: true,
        followedId: true,
        followerId: true
      }
    })

    return {
      code: 201,
      message: "Follow criado com sucesso.",
      data: createdFollow
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const follow = await repository.follow.findUnique({
      where: { id },
      select: {
        id: true,
        followedId: true,
        followerId: true
      }
    })

    if (!follow) {
      return {
        code: 404,
        message: "Follow não encontrado."
      }
    }

    return {
      code: 200,
      message: "Follow encontrado com sucesso.",
      data: follow
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const follow = await repository.follow.findUnique({
      where: { id }
    })

    if (!follow) {
      return {
        code: 404,
        message: "Follow não encontrado."
      }
    }

    const deletedFollow = await repository.follow.delete({
      where: { id },
      select: {
        id: true,
        followedId: true,
        followerId: true
      }
    })

    return {
      code: 200,
      message: "Follow removido com sucesso.",
      data: deletedFollow
    }
  }
}
