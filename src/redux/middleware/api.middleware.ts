import MiddlewareCreator from '../interfaces/middleware-creator.interface'
import Action from '../interfaces/action.interface'
import getApiOptions, { HTTPMethod } from '../api-options'
import { receiveError } from '../actions/error.actions'
import {
    API_REQUEST,
    API_SUCCESS,
    API_ERROR,
    apiRequest,
    apiSuccess,
    apiError,
} from '../actions/api.actions'

export interface ApiRequestOptions {
    url: string
    method: HTTPMethod
    body?: string
    successAction: Function
}

interface ApiActionPayload extends ApiRequestOptions {
    data: object
    errorMsg: string
}

interface ApiAction extends Action {
    payload: ApiActionPayload
}

const apiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: ApiAction) => {
    next(action)

    if (action.meta && action.meta.api) {
        dispatch(apiRequest(action.meta.api, action.type))
        return
    }

    if (action.type === API_REQUEST) {
        const {
            url,
            method,
            successAction,
            body,
        } = action.payload
        const { triggeredBy } = action.meta
        const options: object = getApiOptions(method, body)

        fetch(url, options)
            .then(response => response.json())
            .then(data => dispatch(apiSuccess(successAction, data, triggeredBy)))
            .catch(error => dispatch(apiError(error.message, triggeredBy)))

        return
    }

    if (action.type === API_SUCCESS) {
        const { successAction, data } = action.payload
        dispatch(successAction(data))
        return
    }

    if (action.type === API_ERROR) {
        const { errorMsg } = action.payload
        dispatch(receiveError(errorMsg))
    }
}

export default apiMiddleware
