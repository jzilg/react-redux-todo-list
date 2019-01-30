import Action from '../../interfaces/action.interface'
import { receiveError } from '../actions/error.actions'
import 'whatwg-fetch'

export const API = 'API'

interface ApiActionPayload {
    url: string
    options: object
    successAction: Function
}

interface ApiAction extends Action {
    payload: ApiActionPayload
}

const apiMiddleware = ({ dispatch }): Function => next => (action: ApiAction) => {
    next(action)

    if (action.type.includes(API)) {
        const { url, options, successAction } = action.payload

        fetch(url, options)
            .then(response => response.json())
            .then(data => dispatch(successAction(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}

export default apiMiddleware
