import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

function removeTodoRequest() {
    return {
        type: REMOVE_TODO_REQUEST,
    }
}

function removeTodoSuccess(data) {
    return {
        data,
        type: REMOVE_TODO_SUCCESS,
    }
}

export function removeTodo(data) {
    return (dispatch) => {
        dispatch(removeTodoRequest())
        return fetch(`${BACKEND_URL}/todos/${data.id}`, {
            method: 'DELETE',
        })
            .then(() => dispatch(removeTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}
