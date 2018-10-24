import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const SAVE_TODO_REQUEST = 'SAVE_TODO_REQUEST'
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS'

const saveTodoRequest = () => ({
    type: SAVE_TODO_REQUEST,
})

const saveTodoSuccess = todo => ({
    type: SAVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const saveTodo = todo => (dispatch) => {
    dispatch(saveTodoRequest())

    const url = `${BACKEND_URL}/todos/${todo.id}`
    const request = fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })

    return request
        .then(() => dispatch(saveTodoSuccess(todo)))
        .catch(error => dispatch(receiveError(error)))
}
