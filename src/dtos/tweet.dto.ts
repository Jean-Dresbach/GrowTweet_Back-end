export interface CreateTweetDTO {
  content: string
  userId: string
}

export interface UpdateTweetDTO {
  id: string
  content?: string
}
