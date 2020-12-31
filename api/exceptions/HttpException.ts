class HttpException extends Error {
    status: number
    message: string

    constructor(message?: string | Error | null, status?: number | null) {
        if (message instanceof Error) message = message.message
        if (!message) message = 'Server Error'

        super(message)
        this.status = status || 500
        this.message = message
    }
}

export default HttpException
