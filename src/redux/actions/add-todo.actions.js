import { API } from '../middleware/api.middleware'
import getApiOptions from '../api-options'

export const ADD_TODO_REQUEST = `${API}_ADD_TODO_REQUEST`
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const addTodo = (todo) => {
    const url = `${BACKEND_URL}/todos`
    const options = getApiOptions('POST', JSON.stringify(todo))

    return {
        type: ADD_TODO_REQUEST,
        payload: {
            url,
            options,
            successAction: addTodoSuccess,
        },
    }
}
