import MiddlewareCreator from '../../interfaces/middleware-creator.interface'
import Action from '../../interfaces/action.interface'
import { setLoader } from '../actions/ui.actions'

const uiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: Action) => {
    next(action)

    if (action.meta && action.meta.showLoader !== undefined) {
        dispatch(setLoader(action.meta.showLoader, action.type))
    }
}

export default uiMiddleware
