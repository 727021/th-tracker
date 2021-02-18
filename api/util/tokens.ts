import { sign } from 'jsonwebtoken'

import { IUserDocument } from '~/@types/user'
import { JWT_EXPIRES_IN, REFRESH_EXPIRES_IN } from '../util/constants'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env as {
    JWT_SECRET: string
    JWT_REFRESH_SECRET: string
}

type tokens = {
    access_token?: string
    refresh_token?: string
    user?: IUserDocument
}

/**
 * Create new auth/refresh tokens for a user
 *
 * This function does not check for authentication,
 * it just creates new tokens and returns them
 * @param user The user to create tokens for
 */
export const createTokens = (user: IUserDocument): tokens => {
    const access_token = sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )

    const refresh_token = sign(
        { _id: user._id },
        JWT_REFRESH_SECRET + user.password,
        { expiresIn: REFRESH_EXPIRES_IN }
    )

    return { access_token, refresh_token, user }
}
