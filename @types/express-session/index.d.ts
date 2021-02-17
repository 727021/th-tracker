import { APIUser } from '../user'

declare module 'express-session' {
    interface SessionData {
        user: APIUser
    }
}
