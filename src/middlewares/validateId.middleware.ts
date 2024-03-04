import { NextFunction, Request, Response } from "express"

function checkIdsLength(ids: string[], length: number) {
  for (const id of ids) {
    if (id && (id.length < length || id.length > length)) {
      return true
    }
  }
  return false
}

export async function validateId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id, userId, tweetId } = request.params
    const idsToCheck = [id, userId, tweetId]

    if (checkIdsLength(idsToCheck, 36)) {
      return response.status(400).json({
        code: 400,
        message: "Id inválido."
      })
    }

    next()
  } catch (error: any) {
    return response.status(500).json({
      code: 500,
      message: `Erro: ${error.message}`
    })
  }
}
