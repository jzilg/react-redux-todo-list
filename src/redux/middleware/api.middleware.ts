import 'whatwg-fetch'
import MiddlewareCreator from '../../interfaces/middleware-creator.interface'
import Action from '../../interfaces/action.interface'
import getApiOptions from '../api-options'
import { receiveError } from '../actions/error.actions'
import {
    API_REQUEST,
    API_SUCCESS,
    API_ERROR,
    apiRequest,
    apiSuccess,
    apiError,
} from '../actions/api.actions'

interface ApiAction extends Action {
    payload: {
        url: string
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'
        body?: string
        successAction: Function
        data: object
        errorMsg: string
    }
}

const apiMiddleware = ({ dispatch }): MiddlewareCreator => next => (action: ApiAction) => {
    next(action)

    if (action.meta && action.meta.api) {
        const {
            url,
            method,
            successAction,
            body,
        } = action.meta.api
        dispatch(apiRequest(url, method, successAction, body))
    }

    if (action.type === API_REQUEST) {
        const {
            url,
            method,
            successAction,
            body,
        } = action.payload
        const options: object = getApiOptions(method, body)

        fetch(url, options)
            .then(response => response.json())
            .then(data => dispatch(apiSuccess(successAction, data)))
            .catch(error => dispatch(apiError(error.message)))
    }

    if (action.type === API_SUCCESS) {
        const { successAction, data } = action.payload
        dispatch(successAction(data))
    }

    if (action.type === API_ERROR) {
        const { errorMsg } = action.payload
        dispatch(receiveError(errorMsg))
    }
}

export default apiMiddleware
