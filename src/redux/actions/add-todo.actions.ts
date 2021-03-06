import Action from '../interfaces/action.interface'
import Todo from '../../entities/todo.interface'
import BACKEND_URL from '../../constants/api'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

export const addTodoSuccess = (todo: Todo): Action => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        todo,
    },
    meta: {
        ui: {
            showLoader: false,
        },
    },
})

export const addTodo = (todo: Todo): Action => {
    const url = `${BACKEND_URL}/todos`
    return {
        type: ADD_TODO_REQUEST,
        meta: {
            api: {
                url,
                method: 'POST',
                body: JSON.stringify(todo),
                successAction: addTodoSuccess,
            },
            ui: {
                showLoader: true,
            },
        },
    }
}
