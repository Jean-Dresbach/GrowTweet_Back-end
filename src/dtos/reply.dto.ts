export interface CreateReplyDTO {
  content: string
  repliedTweetId: string
  userId: string
}

export interface UpdateReplyDTO {
  content?: string
  replyId: string
}
