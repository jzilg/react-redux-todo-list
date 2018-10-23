import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

function addTodoRequest() {
    return {
        type: ADD_TODO_REQUEST,
    }
}

function addTodoSuccess(data) {
    return {
        data,
        type: ADD_TODO_SUCCESS,
    }
}

export function addTodo(data) {
    return (dispatch) => {
        dispatch(addTodoRequest())

        const url = `${BACKEND_URL}/todos`
        const request = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return request
            .then(() => dispatch(addTodoSuccess(data)))
            .catch(error => dispatch(receiveError(error)))
    }
}
