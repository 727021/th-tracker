import { ObjectId, Document } from 'mongoose'
import { IHabitDocument } from './habit'

export interface ITask {
    owner: ObjectId
    title: string
    description: string
    date: string
    dateCompare: number
    completed: boolean
}
export interface ITaskDocument extends ITask, Document {}
export type APITask = Omit<ITask, 'owner' | 'dateCompare'> &
    Pick<IHabitDocument, '_id'>
export type CompletedTask = Pick<APITask, '_id' | 'completed'>
export type DeletedTask = Pick<APITask, '_id'>
