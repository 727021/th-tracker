import { Document, Schema, model, ObjectId } from 'mongoose'

import dateToNumber from '../util/dateToNumber'

export interface ITask extends Document {
    owner: ObjectId
    title: string
    description: string
    date: string
    dateCompare: number
    completed: boolean
}

export const taskSchema = new Schema<ITask>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    dateCompare: {
        type: Number,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

taskSchema.pre<ITask>('save', function (next) {
    this.dateCompare = dateToNumber(this.date)
    next()
})

export default model<ITask>('Task', taskSchema)
