import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

function requestTodos() {
    return {
        type: REQUEST_TODOS,
    }
}

function receiveTodos(json) {
    return {
        type: RECEIVE_TODOS,
        data: json,
    }
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos())
        return fetch(`${BACKEND_URL}/todos`)
            .then(json => json.json())
            .then(json => dispatch(receiveTodos(json)))
            .catch(error => dispatch(receiveError(error)))
    }
}
