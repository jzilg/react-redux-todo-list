import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

const addTodoRequest = () => ({
    type: ADD_TODO_REQUEST,
})

const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const addTodo = todo => (dispatch) => {
    dispatch(addTodoRequest())

    const url = `${BACKEND_URL}/todos`
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })

    return request
        .then(() => dispatch(addTodoSuccess(todo)))
        .catch(error => dispatch(receiveError(error)))
}
