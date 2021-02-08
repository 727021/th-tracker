import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import HttpException from '../exceptions/HttpException'

import isAuth from '../middleware/auth'

import auth from './auth'
import task from './task'

const router: Router = Router()

router
    .use('/auth', auth)
    .use('/task', isAuth, task)
    .get('/', (req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).send({ message: 'Hello, world!' })
    })
    .use((req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.NOT_FOUND).send({
            message: 'Resource Not Found'
        })
    })
    .use(
        (
            err: HttpException,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (!(err instanceof HttpException)) err = new HttpException(err)

            if (process.env.NODE_ENV === 'development') console.error(err)

            res.status(err.status).send({
                message: err.message,
                status: err.status
            })
        }
    )

export default router
