import 'whatwg-fetch'
import { receiveError } from './error.actions'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

const requestTodos = () => ({
    type: REQUEST_TODOS,
})

const receiveTodos = todos => ({
    type: RECEIVE_TODOS,
    payload: {
        todos,
    },
})

export const fetchTodos = () => (dispatch) => {
    dispatch(requestTodos())

    const url = `${BACKEND_URL}/todos`

    return fetch(url)
        .then(json => json.json())
        .then(todos => dispatch(receiveTodos(todos)))
        .catch(error => dispatch(receiveError(error)))
}
