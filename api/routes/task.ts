import { Router } from 'express'
import { body, query, param } from 'express-validator'

import {
    createTask,
    deleteTask,
    editTask,
    getTask,
    getTasks,
    toggleComplete
} from '../controllers/task'

const router: Router = Router()

const ISODate: RegExp = /^\d{4}-\d{2}-\d{2}$/
const hasLetters = ({
    min,
    max
}: { min?: number; max?: number } = {}): RegExp => {
    let num = '1,'
    if (min && max) {
        if (min > max) {
            let t = min
            min = max
            max = t
        }
        num = `${min},${max}`
    } else if (min || max) num = `${min || ''},${max || ''}`

    return new RegExp(`[A-Za-z]{${num}}`)
}

router
    .get(
        '/',
        [
            query('start', 'Invalid start date').trim().matches(ISODate),
            query('end', 'Invalid end date')
                .trim()
                .matches(ISODate)
                .custom(
                    (val, { req }) =>
                        new Date(val) >= new Date(req.query?.start)
                )
        ],
        getTasks
    )
    .get('/:id', [param('id', 'Invalid task id').isMongoId()], getTask)
    .post(
        '/',
        [
            body('title')
                .trim()
                .isLength({ min: 3, max: 64 })
                .withMessage('Title must be between 3 and 64 characters')
                .matches(hasLetters())
                .withMessage('Title must contain at least 1 letter'),
            body('description'),
            body('date')
        ],
        createTask
    )
    .put('/:id', [], editTask)
    .patch('/:id', [], toggleComplete)
    .delete('/:id', [], deleteTask)

export default router
