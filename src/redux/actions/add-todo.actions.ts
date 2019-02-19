import Todo from '../../entities/todo.interface'
import Action from '../interfaces/action.interface'

export const ADD_TODO = 'ADD_TODO'

export const addTodo = (todo: Todo): Action => ({
    type: ADD_TODO,
    payload: {
        todo,
    },
})
