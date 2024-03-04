import { Request, Response } from "express"

import { ReplyService } from "../services/reply.service"
import { CreateReplyDTO } from "../dtos/reply.dto"

const replyService = new ReplyService()

export class ReplyController {
  public async index(request: Request, response: Response) {
    try {
      const result = await replyService.findAll()

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar replies: ${error.message}`
      })
    }
  }

  public async indexByUserId(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await replyService.findAllByUserId(userId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar replies de um usuário: ${error.message}`
      })
    }
  }

  public async indexByTweetId(request: Request, response: Response) {
    try {
      const { tweetId } = request.params

      const result = await replyService.findAllByTweetId(tweetId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar replies de um tweet: ${error.message}`
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { content, repliedTweetId } = request.body

      const reply: CreateReplyDTO = { content, userId, repliedTweetId }

      const result = await replyService.create(reply)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao criar reply: ${error.message}.`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { replyId } = request.params

      const result = await replyService.findById(replyId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao buscar reply: ${error.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { replyId } = request.params
      const { content } = request.body

      const result = await replyService.update({ replyId, content })

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao atualizar reply: ${error.message}`
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { replyId } = request.params

      const result = await replyService.delete(replyId)

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao excluir reply: ${error.message}`
      })
    }
  }
}
