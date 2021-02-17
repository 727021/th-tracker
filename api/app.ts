import express, { NextFunction, Request, Response } from 'express'
import { urlencoded, json } from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import helmet from 'helmet'
import bearer from 'express-bearer-token'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import mongoConnect from 'connect-mongo'
const MongoStore = mongoConnect(session)

import routes from './routes'

import User from './models/user'
import { APIUser } from '../@types/user'

config()

const PORT: number = Number(process.env.PORT) || 3000

export const app = express()

app.use(morgan('dev'))
    .use(helmet())
    .use(cors({ credentials: true }))
    .use(urlencoded({ extended: false }))
    .use(json())
    .use(
        session({
            secret: 'my secret',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ url: process.env.MONGODB_URL as string }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 12,
                sameSite: 'strict'
            },
            unset: 'destroy',
            rolling: true
        })
    )
    .use(async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.session.user) {
                const user = await User.findById(req.session.user._id)
                if (user) {
                    req.user = user as APIUser
                    req.authenticated = true
                }
            }
            next()
        } catch (err) {
            next(err)
        }
    })
    // .use(bearer())
    // .use((req: Request, res: Response, next: NextFunction) => {
    //     if (req.token) {
    //         verify(
    //             req.token,
    //             process.env.JWT_SECRET as string,
    //             (err, decoded) => {
    //                 req.authenticated = false
    //                 if (err && err.name === 'TokenExpiredError') next()
    //                 else if (err) next(err)
    //                 else
    //                     User.findById((decoded as APIUser)._id)
    //                         .then(user => {
    //                             if (user) {
    //                                 req.user = user
    //                                 req.authenticated = true
    //                             }
    //                             next()
    //                         })
    //                         .catch(err => {
    //                             next(err)
    //                         })
    //             }
    //         )
    //     } else next()
    // })
    .use(routes)

export default app

const db = (tries?: number, max?: number | null) => {
    if (!tries) tries = 1
    if (max && max < 1) max = null
    if (!max) max = Number(process.env.MAX_DB_TRIES) || 3

    mongoose
        .connect(process.env.MONGODB_URL as string, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            family: 4
        })
        .then(() => {
            console.log('Connected to database')
        })
        .catch(() => {
            console.log(
                `Database connection failed. Retrying... (${tries}/${max})`
            )
            if (max && Number(tries) < max) db(Number(tries) + 1, max)
            else process.exit()
        })
}
db()

if (process.env.SERVER_ONLY && +process.env.SERVER_ONLY === 1)
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
