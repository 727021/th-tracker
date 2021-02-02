import { Document, Schema, model, ObjectId } from 'mongoose'

export interface ITask extends Document {
    owner: ObjectId
    title: string
    description: string
    date: string
    completed: boolean
}

export const taskSchema = new Schema({
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
        required: true
    },
    date: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default model<ITask>('Task', taskSchema)
