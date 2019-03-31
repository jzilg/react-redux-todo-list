import Action from '../interfaces/action.interface'
import Todo from '../../entities/todo.interface'
import BACKEND_URL from '../../constants/api'

export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

export const receiveTodos = (todos: Todo[]): Action => ({
    type: RECEIVE_TODOS,
    payload: {
        todos,
    },
    meta: {
        ui: {
            showLoader: false,
        },
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
            ui: {
                showLoader: true,
            },
        },
    }
}
