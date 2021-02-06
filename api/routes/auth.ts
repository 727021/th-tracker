import { Router } from 'express'
import { body } from 'express-validator'

import { postLogin, getUser, postRegister } from '../controllers/auth'
import User from '../models/user'
import isAuth from '../middleware/auth'

const router: Router = Router()

router
    .post(
        '/register',
        [
            body('email')
                .trim()
                .toLowerCase()
                .isEmail()
                .withMessage('Email is invalid')
                .custom(value => {
                    return User.findOne({ email: value }).then(user => {
                        if (user) return Promise.reject('Email is taken')
                    })
                }),
            body('username')
                .trim()
                .matches(/^[0-9a-zA-Z_]+$/)
                .withMessage(
                    'Username must only contain letters, numbers, and underscores'
                )
                .matches(/[0-9A-Za-z]/)
                .withMessage(
                    'Username must contain at least one letter or number'
                )
                .isLength({ min: 6, max: 20 })
                .withMessage(
                    'Username must be between 6 and 20 characters long'
                )
                .custom(async value => {
                    return User.findOne({ username: value }).then(user => {
                        if (user) return Promise.reject('Username is taken')
                    })
                }),
            body('password')
                .trim()
                .isLength({ min: 8 })
                .withMessage('Password must be at least 8 characters long'),
            body('confirm')
                .trim()
                .custom((value, { req }) => {
                    if (value !== req.body.password)
                        throw new Error('Passwords must match')
                    return true
                })
        ],
        postRegister
    )
    .post('/login', postLogin)
    .get('/user', isAuth, getUser)

export default router
