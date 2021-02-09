import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import validationErrors from '../util/validationErrors'
import dateToNumber from '../util/dateToNumber'

import Habit, { CompletionType, RepeatType, Day } from '../models/habit'

export const getHabits = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const start: string = req.query.start as string
    const end: string = req.query.end as string

    try {
        const habits = await Habit.find(
            {
                owner: req.user?._id,
                startCompare: { $lte: dateToNumber(end) }
            },
            '-owner'
        ).or([
            { endCompare: undefined },
            { endCompare: { $gte: dateToNumber(start) } }
        ])

        res.status(StatusCodes.OK).send(habits)
    } catch (err) {
        next(err)
    }
}

export const getHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const habit = await Habit.findOne(
            { owner: req.user?._id, _id: id },
            '-owner'
        )

        if (!habit)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Habit Not Found' })

        res.status(StatusCodes.OK).send(habit)
    } catch (err) {
        next(err)
    }
}

export const createHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const title: string = req.body.title
    const description: string = req.body.description
    const start: string = req.body.start
    const completion: CompletionType = req.body.completion
    const repeat: RepeatType = req.body.repeat
    const days: Day[] | undefined = req.body.days

    try {
        const habit = new Habit({
            owner: req.user?._id,
            title,
            description,
            start,
            completion: {
                type: completion,
                days: []
            },
            repeat,
            days
        })

        const saved = await habit.save()

        res.status(StatusCodes.CREATED).send({
            _id: saved._id,
            title: saved.title,
            description: saved.description,
            start: saved.start,
            startCompare: saved.startCompare,
            end: saved.end,
            endCompare: saved.endCompare,
            completion: saved.completion,
            repeat: saved.repeat,
            days: saved.days
        })
    } catch (err) {
        next(err)
    }
}

export const endHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const habit = await Habit.findOne({ owner: req.user?._id, _id: id })

        if (!habit)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Habit Not Found' })

        habit.end = new Date().toISOString().substring(0, 10)

        const saved = await habit.save()

        res.status(StatusCodes.OK).send({
            _id: saved._id,
            end: saved.end,
            endCompare: saved.endCompare
        })
    } catch (err) {
        next(err)
    }
}

export const editHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id
    const title: string = req.body.title
    const description: string = req.body.description
    const repeat: RepeatType = req.body.repeat
    const days: Day[] = req.body.days || []

    try {
        const habit = await Habit.findOne({ owner: req.user?._id, _id: id })

        if (!habit)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Habit Not Found' })

        habit.title = title
        habit.description = description
        habit.repeat = repeat
        habit.days = days

        const saved = await habit.save()

        res.status(StatusCodes.CREATED).send({
            _id: saved._id,
            title: saved.title,
            description: saved.description,
            start: saved.start,
            startCompare: saved.startCompare,
            end: saved.end,
            endCompare: saved.endCompare,
            completion: saved.completion,
            repeat: saved.repeat,
            days: saved.days
        })
    } catch (err) {
        next(err)
    }
}

export const completeHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id
    const date: string = req.body.date
    const completion: string | number | boolean = req.body.completion

    try {
        const habit = await Habit.findOne({ owner: req.user?._id, _id: id })

        if (!habit)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Habit Not Found' })

        const saved = await habit.markComplete(date, completion)

        res.status(StatusCodes.OK).send({
            _id: saved._id,
            completion: saved.completion
        })
    } catch (err) {
        next(err)
    }
}

export const deleteHabit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (validationErrors(req, res)) return

    const id: string = req.params.id

    try {
        const habit = await Habit.findOneAndDelete({
            owner: req.user?._id,
            _id: id
        })

        if (!habit)
            return res
                .status(StatusCodes.NOT_FOUND)
                .send({ error: 'Habit Not Found' })

        res.status(StatusCodes.OK).send({ _id: habit._id })
    } catch (err) {
        next(err)
    }
}
