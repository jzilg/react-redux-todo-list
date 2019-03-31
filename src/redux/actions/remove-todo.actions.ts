import Action from '../interfaces/action.interface'
import Todo from '../../entities/todo.interface'
import BACKEND_URL from '../../constants/api'

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

export const removeTodoSuccess = (todo: Todo): Action => ({
    type: REMOVE_TODO_SUCCESS,
    payload: {
        todo,
    },
    meta: {
        ui: {
            showLoader: false,
            notification: {
                type: 'success',
                message: 'Todo removed',
                duration: 4000,
            },
        },
    },
})

export const removeTodo = (todo: Todo): Action => {
    const url = `${BACKEND_URL}/todos/${todo.id}`

    return {
        type: REMOVE_TODO_REQUEST,
        meta: {
            api: {
                url,
                method: 'DELETE',
                successAction: () => removeTodoSuccess(todo),
            },
            ui: {
                showLoader: true,
            },
        },
    }
}
