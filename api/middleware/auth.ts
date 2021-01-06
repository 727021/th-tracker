import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import HttpException from '../exceptions/HttpException'

export default (req: Request, res: Response, next: NextFunction) =>
    req.authenticated
        ? next()
        : next(new HttpException('Not Logged In', StatusCodes.UNAUTHORIZED))
