import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const SAVE_TODO_REQUEST = 'SAVE_TODO_REQUEST'
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS'

function saveTodoRequest() {
    return {
        type: SAVE_TODO_REQUEST,
    }
}

function saveTodoSuccess(data) {
    return {
        data,
        type: SAVE_TODO_SUCCESS,
    }
}

export function saveTodo(data) {
    return (dispatch) => {
        dispatch(saveTodoRequest())
        return fetch(`${BACKEND_URL}/todos/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => dispatch(saveTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}
