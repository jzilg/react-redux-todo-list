import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import BACKEND_URL from '../../constants/api'

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'

const removeTodoSuccess = (todo: Todo): Action => ({
    type: REMOVE_TODO_SUCCESS,
    payload: {
        todo,
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
        },
    }
}
