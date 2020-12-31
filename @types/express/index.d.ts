import { IUser } from '@/api/models/user'

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null
        }
    }
}
