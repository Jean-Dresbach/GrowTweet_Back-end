import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateLikeDTO } from "../dtos/like.dto"

export class LikeService {
  public async findAll(): Promise<ResponseDTO> {
    const likes = await repository.like.findMany({
      select: {
        id: true,
        tweetId: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Likes listados com sucesso.",
      data: likes
    }
  }

  public async findAllById(id: string): Promise<ResponseDTO> {
    const likes = await repository.like.findMany({
      where: {
        userId: id
      },
      select: {
        id: true,
        tweetId: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Likes do usuário listados com sucesso.",
      data: likes
    }
  }

  public async create(likeDTO: CreateLikeDTO): Promise<ResponseDTO> {
    const createdLike = await repository.like.create({
      data: {
        tweetId: likeDTO.tweetId,
        userId: likeDTO.userId
      },
      select: {
        id: true,
        tweetId: true,
        userId: true
      }
    })

    return {
      code: 201,
      message: "Likes criado com sucesso.",
      data: createdLike
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const like = await repository.like.findUnique({
      where: { id },
      select: {
        id: true,
        tweetId: true,
        userId: true
      }
    })

    if (!like) {
      return {
        code: 404,
        message: "Like não encontrado."
      }
    }

    return {
      code: 200,
      message: "Like encontrado com sucesso.",
      data: like
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const like = await repository.like.findUnique({
      where: { id }
    })

    if (!like) {
      return {
        code: 404,
        message: "Like não encontrado."
      }
    }

    const deletedLike = await repository.like.delete({
      where: { id },
      select: {
        id: true,
        tweetId: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Like removido com sucesso.",
      data: deletedLike
    }
  }
}
