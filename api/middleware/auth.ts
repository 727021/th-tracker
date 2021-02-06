import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import HttpException from '../exceptions/HttpException'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.authenticated) return next()
    next(new HttpException('Not Logged In', StatusCodes.UNAUTHORIZED))
}

export default isAuth
