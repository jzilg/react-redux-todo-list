import { API } from '../middleware/api.middleware'
import getApiOptions from '../api-options'

export const SAVE_TODO_REQUEST = `${API}_SAVE_TODO_REQUEST`
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS'

const saveTodoSuccess = todo => ({
    type: SAVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const saveTodo = (todo) => {
    const url = `${BACKEND_URL}/todos/${todo.id}`
    const options = getApiOptions('PUT', JSON.stringify(todo))

    return {
        type: SAVE_TODO_REQUEST,
        payload: {
            url,
            options,
            successAction: saveTodoSuccess,
        },
    }
}