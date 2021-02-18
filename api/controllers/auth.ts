import { Request, Response, NextFunction } from 'express'
import { hash, compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { decode, verify, TokenExpiredError } from 'jsonwebtoken'

import { SALT_ROUNDS } from '../util/constants'
import validationErrors from '../util/validationErrors'

import { APIUser } from '~/@types/user'
import { User } from '../models'
import { createTokens } from '../util/tokens'
import HttpException from '../exceptions/HttpException'

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const { email, username, password } = req.body

    try {
        const hashed = await hash(password, SALT_ROUNDS)
        await new User({
            email,
            username,
            password: hashed
        }).save()

        res.status(StatusCodes.CREATED).send({ username })
    } catch (err) {
        next(err)
    }
}

export const postLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user || !(await compare(password, user.password)))
            return res
                .status(StatusCodes.CONFLICT)
                .send({ error: 'Invalid Username/Password' })

        const { access_token, refresh_token } = createTokens(user)

        res.status(StatusCodes.OK).send({
            access_token,
            refresh_token
        })

        // const token = sign(
        //     { _id: user._id },
        //     process.env.JWT_SECRET as string,
        //     {
        //         expiresIn: JWT_EXPIRES_IN
        //     }
        // )

        // res.status(StatusCodes.OK).send({
        //     token,
        //     user: {
        //         _id: user._id,
        //         username: user.username,
        //         email: user.email
        //     }
        // })
    } catch (err) {
        next(err)
    }
}

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'User Not Found' })

        res.status(StatusCodes.OK).send({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
        })
    } catch (err) {
        next(err)
    }
}

export const postRefresh = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.refresh_token)
        return next(
            new HttpException('Not Logged In', StatusCodes.UNAUTHORIZED)
        )

    try {
        const { _id } = decode(req.refresh_token) as Pick<APIUser, '_id'>

        const user = await User.findById(_id)

        if (!user)
            return next(
                new HttpException('Not Logged In', StatusCodes.UNAUTHORIZED)
            )

        verify(
            req.refresh_token,
            process.env.JWT_REFRESH_SECRET + user.password
        )

        const { access_token, refresh_token } = createTokens(user)

        res.status(StatusCodes.OK).send({
            access_token,
            refresh_token
        })
    } catch (err) {
        if (err instanceof TokenExpiredError)
            return next(
                new HttpException('Not Logged In', StatusCodes.UNAUTHORIZED)
            )
        next(err)
    }
}
