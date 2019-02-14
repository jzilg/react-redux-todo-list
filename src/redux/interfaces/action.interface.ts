import { ApiRequestOptions } from '../middleware/api.middleware'

export default interface Action {
    type: string
    payload?: object
    meta?: {
        api?: ApiRequestOptions
        showLoader?: boolean
        triggeredBy?: string
    }
}
