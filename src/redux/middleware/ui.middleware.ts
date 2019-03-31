import MiddlewareCreator from '../interfaces/middleware-creator.interface'
import Notification from '../../entities/notification.interface'
import Action from '../interfaces/action.interface'
import { setLoader, setNotification, unsetNotification } from '../actions/ui.actions'

export interface UiOptions {
    showLoader?: boolean
    notification?: Notification
}

const uiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: Action) => {
    next(action)

    if (!action.meta || !action.meta.ui) {
        return
    }

    if (action.meta.ui.showLoader !== undefined) {
        dispatch(setLoader(action.meta.ui.showLoader, action.type))
    }

    if (action.meta.ui.notification) {
        dispatch(setNotification(action.meta.ui.notification, action.type))

        const { id, duration } = action.meta.ui.notification
        if (duration) {
            setTimeout(() => {
                dispatch(unsetNotification(id, action.type))
            }, duration)
        }
    }
}

export default uiMiddleware
