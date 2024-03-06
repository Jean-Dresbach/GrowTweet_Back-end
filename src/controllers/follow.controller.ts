import { Request, Response } from "express"

import { FollowService } from "../services/follow.service"
import { CreateFollowDTO } from "../dtos/follow.dto"

const followService = new FollowService()

export class FollowController {
  public async index(request: Request, response: Response) {
    try {
      const result = await followService.findAll()

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar follows: ${error.message}`
      })
    }
  }

  public async indexById(request: Request, response: Response) {
    try {
      const { userId, followedId } = request.params
      const idToFind = followedId || userId

      const result = await followService.findAllById(idToFind)

      return response.status(result.code).json(result)
    } catch (error: any) {
      return response.status(500).json({
        code: 500,
        message: `Erro ao listar follows de um usuário: ${error.message}`
      })
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const { userId } = request.params
      const { followedId } = request.body

      const follow: CreateFollowDTO = { followedId, followerId: userId }

      const result = await followService.create(follow)

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
      const { followId } = request.params

      const result = await followService.findById(followId)

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
      const { followId } = request.params

      const result = await followService.delete(followId)

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
