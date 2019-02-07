import Action from '../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import BACKEND_URL from '../../constants/api'

export const REQUEST_TODOS = 'REQUEST_TODOS'
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
    return {
        type: REQUEST_TODOS,
        meta: {
            api: {
                url,
                method: 'GET',
                successAction: receiveTodos,
            },
            showLoader: true,
        },
    }
}
