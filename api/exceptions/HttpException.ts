export default class HttpException extends Error {
    status: number
    message: string

    constructor(status?: number, message?: string) {
        super(message || 'Server Error')
        this.status = status || 500
        this.message = message || 'Server Error'
    }
}
