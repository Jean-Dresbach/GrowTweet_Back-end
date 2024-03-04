import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateTweetDTO, UpdateTweetDTO } from "../dtos/tweet.dto"

export class TweetService {
  public async findAll(): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      select: {
        id: true,
        content: true,
        type: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Tweets listados com sucesso.",
      data: tweets
    }
  }

  public async findAllById(id: string): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      where: {
        userId: id
      },
      select: {
        id: true,
        content: true,
        type: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Tweets do usuário listados com sucesso.",
      data: tweets
    }
  }

  public async create(tweetDTO: CreateTweetDTO): Promise<ResponseDTO> {
    const createdTweet = await repository.tweet.create({
      data: {
        content: tweetDTO.content,
        userId: tweetDTO.userId
      },
      select: {
        id: true,
        content: true,
        userId: true
      }
    })

    return {
      code: 201,
      message: "Tweet criado com sucesso.",
      data: createdTweet
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const tweet = await repository.tweet.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        userId: true
      }
    })

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet não encontrado."
      }
    }

    return {
      code: 200,
      message: "Tweet encontrado com sucesso.",
      data: tweet
    }
  }

  public async update(tweetDTO: UpdateTweetDTO): Promise<ResponseDTO> {
    const tweet = await repository.tweet.findUnique({
      where: {
        id: tweetDTO.id
      }
    })

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet não encontrado."
      }
    }

    const updatedTweet = await repository.tweet.update({
      where: {
        id: tweetDTO.id
      },
      data: {
        content: tweetDTO.content
      },
      select: {
        id: true,
        content: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Tweet atualizado com sucesso.",
      data: updatedTweet
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const tweet = await repository.tweet.findUnique({
      where: { id }
    })

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet não encontrado."
      }
    }

    const deletedTweet = await repository.tweet.delete({
      where: { id },
      select: {
        id: true,
        content: true,
        userId: true
      }
    })

    return {
      code: 200,
      message: "Tweet removido com sucesso.",
      data: deletedTweet
    }
  }
}
