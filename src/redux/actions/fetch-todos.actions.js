import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

function requestTodos() {
    return {
        type: REQUEST_TODOS,
    }
}

function receiveTodos(todos) {
    return {
        type: RECEIVE_TODOS,
        data: todos,
    }
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch(requestTodos())

        const url = `${BACKEND_URL}/todos`

        return fetch(url)
            .then(json => json.json())
            .then(todos => dispatch(receiveTodos(todos)))
            .catch(error => dispatch(receiveError(error)))
    }
}
