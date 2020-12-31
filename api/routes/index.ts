import { Router, Request, Response, NextFunction } from 'express'
import HttpException from '@/api/exceptions/HttpException'

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
            res.status(err.status).send({
                message: err.message
            })
        }
    )

export default router
