import { Router, Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/HttpException'

const router: Router = Router()

router
    .get('/', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({ message: 'Hello, world!' })
    })
    .use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send({ message: 'Resource Not Found' })
    })
    .use(
        (
            err: HttpException,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (!(err instanceof HttpException)) err = new HttpException(err)
            res.status(err.status).send({
                message: err.message,
                status: err.status
            })
        }
    )

export default router
