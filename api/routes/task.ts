import { Router } from 'express'
import { body, query, param } from 'express-validator'

import { ISODate, hasLetters } from '../util/regex'
import {
    createTask,
    deleteTask,
    editTask,
    getTask,
    getTasks,
    toggleComplete
} from '../controllers/task'

const router: Router = Router()

router
    .get('/:id', [param('id', 'Invalid task id').isMongoId()], getTask)
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
    .post(
        '/',
        [
            body('title')
                .trim()
                .isLength({ min: 3, max: 64 })
                .withMessage('Title must be between 3 and 64 characters')
                .matches(hasLetters())
                .withMessage('Title must contain at least 1 letter'),
            body('description')
                .trim()
                .isLength({ max: 128 })
                .withMessage(
                    'Description cannot be longer than 128 characters'
                ),
            body('date', 'Invalid date').trim().matches(ISODate)
        ],
        createTask
    )
    .put(
        '/:id',
        [
            param('id', 'Invalid task id').isMongoId(),
            body('title')
                .trim()
                .isLength({ min: 3, max: 64 })
                .withMessage('Title must be between 3 and 64 characters')
                .matches(hasLetters())
                .withMessage('Title must contain at least 1 letter'),
            body('description')
                .trim()
                .isLength({ max: 128 })
                .withMessage(
                    'Description cannot be longer than 128 characters'
                ),
            body('date', 'Invalid date').trim().matches(ISODate)
        ],
        editTask
    )
    .patch('/:id', [param('id', 'Invalid task id').isMongoId()], toggleComplete)
    .delete('/:id', [param('id', 'Invalid task id').isMongoId()], deleteTask)

export default router
