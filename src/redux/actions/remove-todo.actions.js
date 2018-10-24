import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

const removeTodoRequest = () => ({
    type: REMOVE_TODO_REQUEST,
})

const removeTodoSuccess = todo => ({
    type: REMOVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const removeTodo = todo => (dispatch) => {
    dispatch(removeTodoRequest())

    const url = `${BACKEND_URL}/todos/${todo.id}`
    const request = fetch(url, {
        method: 'DELETE',
    })

    return request
        .then(() => dispatch(removeTodoSuccess(todo)))
        .catch(error => dispatch(receiveError(error)))
}
