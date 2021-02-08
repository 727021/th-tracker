import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import validationErrors from '../util/validationErrors'
import dateToNumber from '../util/dateToNumber'

import { Task } from '../models'

export const getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const start: string = req.query.start as string
    const end: string = req.query.end as string

    try {
        const tasks = await Task.find(
            {
                owner: req.user?._id,
                dateCompare: {
                    $gte: dateToNumber(start),
                    $lte: dateToNumber(end)
                }
            },
            '-dateCompare -owner'
        )

        res.status(StatusCodes.OK).send(tasks)
    } catch (err) {
        next(err)
    }
}

export const getTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const task = await Task.findOne(
            { owner: req.user?._id, _id: id },
            '-dateCompare -owner'
        )

        if (!task)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Task Not Found' })

        res.status(StatusCodes.OK).send(task)
    } catch (err) {
        next(err)
    }
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

    try {
        const task = new Task({
            owner: req.user?._id,
            title,
            description,
            date,
            completed: false
        })
        const saved = await task.save()

        res.status(StatusCodes.CREATED).send({
            _id: saved._id,
            title: saved.title,
            description: saved.description,
            date: saved.date,
            completed: saved.completed
        })
    } catch (err) {
        next(err)
    }
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

    try {
        const task = await Task.findOne(
            { owner: req.user?._id, _id: id },
            '-dateCompare -owner'
        )

        if (!task)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Task Not Found' })

        task.title = title
        task.description = description
        task.date = date

        const saved = await task.save()

        res.status(StatusCodes.OK).send({
            _id: saved._id,
            title: saved.title,
            description: saved.description,
            date: saved.date,
            completed: saved.completed
        })
    } catch (err) {
        next(err)
    }
}

export const toggleComplete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const task = await Task.findOne({ owner: req.user?._id, _id: id })

        if (!task)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Task Not Found' })

        task.completed = !task.completed

        const saved = await task.save()

        res.status(StatusCodes.OK).send({
            _id: saved._id,
            completed: saved.completed
        })
    } catch (err) {
        next(err)
    }
}

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const task = await Task.findOneAndDelete({
            owner: req.user?._id,
            _id: id
        })

        if (!task)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Task Not Found' })

        res.status(StatusCodes.OK).send({ _id: task._id })
    } catch (err) {
        next(err)
    }
}
