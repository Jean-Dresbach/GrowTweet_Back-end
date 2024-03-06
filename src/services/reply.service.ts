import { repository } from "../database/prisma.connection"

import { ResponseDTO } from "../dtos/response.dto"
import { CreateReplyDTO, UpdateReplyDTO } from "../dtos/reply.dto"
import { response } from "express"

export class ReplyService {
  public async findAll(): Promise<ResponseDTO> {
    const replies = await repository.reply.findMany({
      select: {
        id: true,
        tweetId: true,
        tweet: { select: { content: true } }
      }
    })

    return {
      code: 200,
      message: "Replies listados com sucesso.",
      data: replies
    }
  }

  public async findAllByUserId(id: string): Promise<ResponseDTO> {
    const replies = await repository.reply.findMany({
      where: {
        tweet: { userId: id }
      },
      select: {
        id: true,
        tweetId: true,
        tweet: { select: { content: true } }
      }
    })

    return {
      code: 200,
      message: "Replies do usuário listados com sucesso.",
      data: replies
    }
  }

  public async findAllByTweetId(id: string): Promise<ResponseDTO> {
    const replies = await repository.reply.findMany({
      where: {
        repliedTweetId: id
      },
      select: {
        id: true,
        tweetId: true,
        tweet: { select: { content: true } }
      }
    })

    return {
      code: 200,
      message: "Replies do tweet listados com sucesso.",
      data: replies
    }
  }

  public async create(replyDTO: CreateReplyDTO): Promise<ResponseDTO> {
    const checkRepliedTweet = await repository.tweet.findUnique({
      where: { id: replyDTO.repliedTweetId }
    })

    if (!checkRepliedTweet) {
      return {
        code: 404,
        message: "Tweet a ser respondido não encontrado!"
      }
    }

    const createdReply = await repository.tweet.create({
      data: {
        content: replyDTO.content,
        type: "Reply",
        userId: replyDTO.userId
      }
    })

    const createdReplyTweetRelation = await repository.reply.create({
      data: {
        tweetId: createdReply.id,
        repliedTweetId: replyDTO.repliedTweetId
      },
      select: {
        id: true,
        tweetId: true,
        repliedTweetId: true,
        tweet: { select: { content: true } }
      }
    })

    return {
      code: 201,
      message: "Reply criado com sucesso.",
      data: createdReplyTweetRelation
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    const reply = await repository.reply.findUnique({
      where: { id },
      select: {
        id: true,
        tweetId: true,
        repliedTweetId: true,
        tweet: { select: { content: true } }
      }
    })

    if (!reply) {
      return {
        code: 404,
        message: "Reply não encontrado."
      }
    }

    return {
      code: 200,
      message: "Reply encontrado com sucesso.",
      data: reply
    }
  }

  public async update(replyDTO: UpdateReplyDTO): Promise<ResponseDTO> {
    const reply = await repository.reply.findUnique({
      where: { id: replyDTO.replyId }
    })

    if (!reply) {
      return {
        code: 404,
        message: "Reply não encontrado."
      }
    }

    const updatedReply = await repository.tweet.update({
      where: {
        id: reply.tweetId
      },
      data: {
        content: replyDTO.content
      },
      select: {
        id: true,
        userId: true,
        content: true
      }
    })

    return {
      code: 200,
      message: "Reply atualizado com sucesso.",
      data: updatedReply
    }
  }

  public async delete(id: string): Promise<ResponseDTO> {
    const reply = await repository.reply.findUnique({
      where: { id }
    })

    if (!reply) {
      return {
        code: 404,
        message: "Reply não encontrado."
      }
    }

    const deletedReply = await repository.tweet.delete({
      where: { id: reply.tweetId },
      select: {
        id: true,
        userId: true,
        content: true
      }
    })

    return {
      code: 200,
      message: "Reply excluído com sucesso.",
      data: deletedReply
    }
  }
}
