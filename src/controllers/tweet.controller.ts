import { Request, Response } from "express"

import { TweetService } from "../services/tweet.service"
import { CreateTweetDTO } from "../dtos/tweet.dto"

const tweetService = new TweetService()

export class TweetController {
  public async index(request: Request, response: Response) {
    try {
      const result = await tweetService.findAll()

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar tweets: ${error.message}`
      })
    }
  }

  public async indexById(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await tweetService.findAllById(userId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar tweets de um usuário: ${error.message}`
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { content } = request.body

      const tweet: CreateTweetDTO = { content, userId }

      const result = await tweetService.create(tweet)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao criar tweet: ${error.message}.`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { tweetId } = request.params

      const result = await tweetService.findById(tweetId)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao buscar tweet: ${error.message}`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { tweetId } = request.params
      const { content } = request.body

      const result = await tweetService.update({ id: tweetId, content })

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao atualizar tweet: ${error.message}`
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { tweetId } = request.params

      const result = await tweetService.delete(tweetId)

      response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao excluir tweet: ${error.message}`
      })
    }
  }
}
