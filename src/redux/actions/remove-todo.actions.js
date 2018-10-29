import { API } from '../middleware/api.middleware'
import getApiOptions from '../api-options'

export const REMOVE_TODO_REQUEST = `${API}_REMOVE_TODO_REQUEST`
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

const removeTodoSuccess = todo => ({
    type: REMOVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const removeTodo = (todo) => {
    const url = `${BACKEND_URL}/todos/${todo.id}`
    const options = getApiOptions('DELETE')

    return {
        type: REMOVE_TODO_REQUEST,
        payload: {
            url,
            options,
            successAction: () => removeTodoSuccess(todo),
        },
    }
}
