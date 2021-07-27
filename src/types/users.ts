
export interface IUser {
  name: string
  username: string
  id: number
}

export type IUserForm = Omit<IUser, 'id'>

export type IUserList = Array<IUser>
