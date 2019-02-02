import Action from '../../interfaces/action.interface'
import Todo from '../../interfaces/todo.interface'

export const TODOS = '[TODOS]'

export const FETCH_TODOS = `${TODOS} fetch`
export const ADD_TODO = `${TODOS} add`
export const SAVE_TODO = `${TODOS} save`
export const REMOVE_TODO = `${TODOS} remove`

export const SET_TODOS = `${TODOS} set`

export const fetchTodos = (): Action => ({
    type: FETCH_TODOS,
    meta: {
        entity: TODOS,
    },
})

export const addTodo = (todo: Todo): Action => ({
    type: ADD_TODO,
    payload: {
        todo,
    },
})

export const saveTodo = (todo: Todo): Action => ({
    type: SAVE_TODO,
    payload: {
        todo,
    },
})

export const removeTodo = (todo: Todo): Action => ({
    type: REMOVE_TODO,
    payload: {
        todo,
    },
})

export const setTodos = (todos: Todo[]): Action => ({
    type: SET_TODOS,
    payload: {
        todos,
    },
    meta: {
        entity: TODOS,
    },
})

