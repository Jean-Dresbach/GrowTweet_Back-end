import { Request, Response } from "express"

import { LikeService } from "../services/like.service"
import { CreateLikeDTO } from "../dtos/like.dto"

const likeService = new LikeService()

export class LikeController {
  public async index(request: Request, response: Response) {
    try {
      const result = await likeService.findAll()

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar likes: ${error.message}`
      })
    }
  }

  public async indexById(request: Request, response: Response) {
    try {
      const { userId } = request.params

      const result = await likeService.findAllById(userId)

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
      const { tweetId } = request.body

      const like: CreateLikeDTO = { tweetId, userId }

      const result = await likeService.create(like)

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
      const { likeId } = request.params

      const result = await likeService.findById(likeId)

      return response.status(result.code).json(result)
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
      const { likeId } = request.params

      const result = await likeService.delete(likeId)

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
