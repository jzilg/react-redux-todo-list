import 'whatwg-fetch'
import { receiveError } from '../actions/error.actions'

export const API = 'API'

const apiMiddleware = ({ dispatch }) => next => (action) => {
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
