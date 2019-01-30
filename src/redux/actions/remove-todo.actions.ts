import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import { API } from '../middleware/api.middleware'
import BACKEND_URL from '../../constants/api'
import getApiOptions from '../api-options'

export const REMOVE_TODO_REQUEST = `${API}_REMOVE_TODO_REQUEST`
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

const removeTodoSuccess = (todo: Todo): Action => ({
    type: REMOVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const removeTodo = (todo: Todo): Action => {
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
