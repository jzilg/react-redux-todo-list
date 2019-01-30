import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'
import { API } from '../middleware/api.middleware'
import BACKEND_URL from '../../constants/api'
import getApiOptions from '../api-options'

export const ADD_TODO_REQUEST = `${API}_ADD_TODO_REQUEST`
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

const addTodoSuccess = (todo: Todo): Action => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        todo,
    },
})

export const addTodo = (todo): Action => {
    const url = `${BACKEND_URL}/todos`
    const options = getApiOptions('POST', JSON.stringify(todo))

    return {
        type: ADD_TODO_REQUEST,
        payload: {
            url,
            options,
            successAction: addTodoSuccess,
        },
    }
}
