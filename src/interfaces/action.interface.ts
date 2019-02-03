import { ApiRequestOptions } from '../redux/middleware/api.middleware'

export default interface Action {
    type: string
    payload?: object
    meta?: {
        api?: ApiRequestOptions
        showLoader?: boolean
        triggeredBy?: string
    }
}
