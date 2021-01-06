import { StatusCodes, getReasonPhrase } from 'http-status-codes'

class HttpException extends Error {
    status: number
    message: string

    constructor(message?: string | Error | null, status?: number | null) {
        if (message instanceof Error) message = message.message
        if (!status) status = StatusCodes.INTERNAL_SERVER_ERROR
        if (!message)
            message =
                getReasonPhrase(status) ||
                getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)

        super(message)
        this.message = message
        this.status = status
    }
}

export default HttpException
