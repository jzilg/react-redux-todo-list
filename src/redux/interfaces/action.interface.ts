import { ApiRequestOptions } from '../middleware/api.middleware'
import { UiOptions } from '../middleware/ui.middleware'

export default interface Action {
    type: string
    payload?: object
    meta?: {
        api?: ApiRequestOptions
        ui?: UiOptions
        triggeredBy?: string
    }
}
