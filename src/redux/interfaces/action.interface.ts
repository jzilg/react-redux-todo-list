import { ApiRequestOptions } from '../middleware/api.middleware'
import Notification from '../../entities/notification.interface'

export default interface Action {
    type: string
    payload?: object
    meta?: {
        api?: ApiRequestOptions
        showLoader?: boolean
        triggeredBy?: string
        notification?: Notification
    }
}
