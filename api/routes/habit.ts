import { Router } from 'express'
import { body, query, param, oneOf } from 'express-validator'

import { ISODate, hasLetters } from '../util/regex'
import {
    completeHabit,
    createHabit,
    deleteHabit,
    editHabit,
    endHabit,
    getHabit,
    getHabits
} from '../controllers/habit'

const router: Router = Router()

router
    .get('/:id', [param('id', 'Invalid habit id').isMongoId()], getHabit)
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
        getHabits
    )
    .post('/:id', [param('id', 'Invalid habit id').isMongoId()], endHabit)
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
            body('start', 'Invalid start date').trim().matches(ISODate),
            body('completion', 'Invalid completion type').isInt({
                min: 0,
                max: 3
            }),
            body('repeat', 'Invalid repeat type').isInt({ min: 0, max: 3 }),
            body('days', 'Invalid repeat days')
                .optional()
                .isArray()
                .custom((val: any[]) => {
                    return [...new Set(val)].every(
                        n => !isNaN(+n) && n >= 0 && n <= 6
                    )
                })
                .customSanitizer(val => {
                    return [...new Set(val.map(Number))]
                })
        ],
        createHabit
    )
    .put(
        '/:id',
        [
            param('id', 'Invalid habit id').isMongoId(),
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
            body('repeat', 'Invalid repeat type').isInt({ min: 0, max: 3 }),
            body('days', 'Invalid repeat days')
                .optional()
                .isArray()
                .custom((val: any[]) => {
                    return [...new Set(val)].every(
                        n => !isNaN(+n) && n >= 0 && n <= 6
                    )
                })
                .customSanitizer(val => {
                    return [...new Set(val.map(Number))]
                })
        ],
        editHabit
    )
    .patch(
        '/:id',
        [
            param('id', 'Invalid habit id').isMongoId(),
            body('date', 'Invalid completion date').trim().matches(ISODate),
            oneOf(
                [
                    body('completion')
                        .isString()
                        .trim()
                        .isLength({ min: 1 })
                        .withMessage('Text entry cannot be empty')
                        .matches(hasLetters())
                        .withMessage(
                            'Text entry must contain at least one letter'
                        ),
                    body('completion').isNumeric().toFloat(),
                    body('completion').isBoolean()
                ],
                'Invalid completion value'
            )
        ],
        completeHabit
    )
    .delete('/:id', [param('id', 'Invalid habit id').isMongoId()], deleteHabit)

export default router
