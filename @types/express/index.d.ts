import { APIUser } from '~/@types/user'

declare global {
    namespace Express {
        interface Request {
            user?: APIUser | null
            authenticated?: boolean
        }
    }
}
