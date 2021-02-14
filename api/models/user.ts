import { Schema, model } from 'mongoose'

import { IUserDocument } from '../../@types/user'

export const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default model<IUserDocument>('User', userSchema)
