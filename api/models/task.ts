import { Schema, model } from 'mongoose'

import dateToNumber from '../util/dateToNumber'

import { ITaskDocument } from '../../@types/task'

export const taskSchema = new Schema<ITaskDocument>({
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

taskSchema.pre<ITaskDocument>('save', function (next) {
    this.dateCompare = dateToNumber(this.date)
    next()
})

export default model<ITaskDocument>('Task', taskSchema)
