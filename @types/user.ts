import { Document } from 'mongoose'

export interface IUser {
    username: string
    email: string
    password: string
}
export interface IUserDocument extends IUser, Document {}
export type APIUser = Pick<IUserDocument, '_id' | 'username' | 'email'>
