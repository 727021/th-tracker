import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

/**
 * Checks for validation errors and sends a response if errors exist.
 * @param req Express Request object.
 * @param res Express Response object.
 * @returns Whether there were validation errors.
 */
const validationErrors = (req: Request, res: Response): boolean => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return false
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
        errors: errors.array()
    })
    return true
}

export default validationErrors
