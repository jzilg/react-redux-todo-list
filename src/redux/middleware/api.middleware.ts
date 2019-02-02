import Action from '../../interfaces/action.interface'
import MiddlewareCreator from '../../interfaces/middleware-creator.interface'
import { API_REQUEST, apiError, apiSuccess } from '../actions/api.actions'
import 'whatwg-fetch'

export const API = 'API'

interface ApiActionPayload {
    url: string
    method: string
    body?: string
}

interface ApiActionMeta {
    entity: string
}

interface ApiAction extends Action {
    payload: ApiActionPayload
    meta: ApiActionMeta
}

const apiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: ApiAction) => {
    next(action)

    if (action.type.includes(API_REQUEST)) {
        const { url, method, body } = action.payload
        const { entity } = action.meta
        const options = {
            method,
            body,
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => dispatch(apiSuccess(data, entity)))
            .catch(error => dispatch(apiError(error, entity)))
    }
}

export default apiMiddleware
