import { Request, Response, NextFunction } from 'express'
import { hash, compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { sign, decode } from 'jsonwebtoken'

import { SALT_ROUNDS, JWT_EXPIRES_IN } from '../util/constants'
import validationErrors from '../util/validationErrors'

import { APIUser } from '~/@types/user'
import { User } from '../models'

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

        req.session.user = user as APIUser

        req.session.save(err => {
            if (err) return next(err)
            res.status(StatusCodes.OK).send({
                token: req.session.id,
                user: req.session.user
            })
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
        // const { _id } = decode(req.token as string) as { _id: string }

        // const user = await User.findById(_id)

        // if (!user)
        //     return res
        //         .status(StatusCodes.NOT_FOUND)
        //         .send({ error: 'User Not Found' })

        // res.status(StatusCodes.OK).send({
        //     user: {
        //         _id: user._id,
        //         username: user.username,
        //         email: user.email
        //     }
        // })

        res.status(StatusCodes.OK).send({ user: req.user as APIUser })
    } catch (err) {
        next(err)
    }
}

export const logOut = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.session.destroy(err => {
        if (err) return next(err)
        res.status(StatusCodes.OK).send({ message: 'Logged Out' })
    })
}
