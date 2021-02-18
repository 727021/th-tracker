import { IUserDocument } from '~/@types/user'

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument | null
            authenticated?: boolean
            refresh_token?: string
        }
    }
}
