import { Request, Response } from "express"

import { TweetService } from "../services/tweet.service"
import { CreateTweetDTO } from "../dtos/tweet.dto"

const tweetService = new TweetService()

export class TweetController {
  public async index(request: Request, response: Response) {
    try {
      const result = await tweetService.findAll()

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async indexById(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await tweetService.findAllById(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async showFeed(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await tweetService.findAllById(userId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
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
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { tweetId } = request.params

      const result = await tweetService.findById(tweetId)

      return response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { tweetId } = request.params
      const { content } = request.body

      const result = await tweetService.update({ id: tweetId, content })

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { tweetId } = request.params

      const result = await tweetService.delete(tweetId)

      response.status(result.code).json(result)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        code: 500,
        message: `Erro interno do servidor.`
      })
    }
  }
}
