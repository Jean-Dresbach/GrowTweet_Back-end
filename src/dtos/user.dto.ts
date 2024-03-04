export interface CreateUserDTO {
  name: string
  email: string
  username: string
  password: string
}

export interface UpdateUserDTO {
  userId: string
  name?: string
  email?: string
  username?: string
  password?: string
}
