import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import validationErrors from '../util/validationErrors'

import { Task } from '../models'

export const getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const start: string = req.query.start as string
    const end: string = req.query.end as string

    res.status(StatusCodes.OK).send({
        message: 'Tasks in date range',
        req: { query: { start, end } },
        res:
            '{ id: string, title: string, description: string, date: string, completed: boolean }[]'
    })
}

export const getTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    res.status(StatusCodes.OK).send({
        message: 'Single task by id',
        req: { params: { id } },
        res:
            '{ id: string, title: string, description: string, date: string, completed: boolean }'
    })
}

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const title: string = req.body.title
    const description: string = req.body.description
    const date: string = req.body.date

    res.status(StatusCodes.CREATED).send({
        message: 'Create new task',
        req: { body: { title, description, date } },
        res:
            '{ id: string, title: string, description: string, date: string, completed: boolean }'
    })
}

export const editTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id
    const title: string = req.body.title
    const description: string = req.body.description
    const date: string = req.body.date

    res.status(StatusCodes.OK).send({
        message: 'Edit existing task',
        req: { params: { id }, body: { title, description, date } },
        res:
            '{ id: string, title: string, description: string, date: string, completed: boolean }'
    })
}

export const toggleComplete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    res.status(StatusCodes.OK).send({
        message: 'Toggle task completion',
        req: { params: { id } },
        res: '{ id: string, complete: boolean }'
    })
}

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    res.status(StatusCodes.OK).send({
        message: 'Delete task',
        req: { params: { id } },
        res: '{ id: string }'
    })
}
