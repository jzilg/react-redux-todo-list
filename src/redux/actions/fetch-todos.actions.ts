import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import { API } from '../middleware/api.middleware'
import BACKEND_URL from '../../constants/api'
import getApiOptions from '../api-options'

export const REQUEST_TODOS = `${API}_REQUEST_TODOS`
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

const receiveTodos = (todos: Todo[]): Action => ({
    type: RECEIVE_TODOS,
    payload: {
        todos,
    },
    meta: {
        showLoader: false,
    },
})

export const fetchTodos = (): Action => {
    const url = `${BACKEND_URL}/todos`
    const options = getApiOptions('GET')

    return {
        type: REQUEST_TODOS,
        payload: {
            url,
            options,
            successAction: receiveTodos,
        },
        meta: {
            showLoader: true,
        },
    }
}
