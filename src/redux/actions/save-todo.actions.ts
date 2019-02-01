import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import BACKEND_URL from '../../constants/api'

export const SAVE_TODO_REQUEST = 'SAVE_TODO_REQUEST'
export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS'

const saveTodoSuccess = (todo: Todo): Action => ({
    type: SAVE_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const saveTodo = (todo: Todo): Action => {
    const url = `${BACKEND_URL}/todos/${todo.id}`
    return {
        type: SAVE_TODO_REQUEST,
        meta: {
            api: {
                url,
                method: 'PUT',
                body: JSON.stringify(todo),
                successAction: saveTodoSuccess,
            },
        },
    }
}
