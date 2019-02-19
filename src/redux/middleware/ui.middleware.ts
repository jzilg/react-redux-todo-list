import MiddlewareCreator from '../interfaces/middleware-creator.interface'
import Action from '../interfaces/action.interface'
import { setLoader, setNotification, unsetNotification } from '../actions/ui.actions'

const uiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: Action) => {
    next(action)

    if (action.meta && action.meta.showLoader !== undefined) {
        dispatch(setLoader(action.meta.showLoader, action.type))
    }

    if (action.meta && action.meta.notification) {
        dispatch(setNotification(action.meta.notification, action.type))

        const { id, duration } = action.meta.notification
        if (duration) {
            setTimeout(() => {
                dispatch(unsetNotification(id, action.type))
            }, duration)
        }
    }
}

export default uiMiddleware
