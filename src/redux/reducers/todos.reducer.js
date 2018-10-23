import { List } from 'immutable'
import { RECEIVE_TODOS } from '../actions/fetch-todos.actions'
import { ADD_TODO_SUCCESS } from '../actions/add-todo.actions'
import { SAVE_TODO_SUCCESS } from '../actions/save-todo.actions'
import { REMOVE_TODO_SUCCESS } from '../actions/remove-todo.actions'

function todos(
    state = List(),
    action,
) {
    switch (action.type) {
        case ADD_TODO_SUCCESS: {
            return state.push(action.data)
        }
        case REMOVE_TODO_SUCCESS: {
            return state.filter(todo => todo.id !== action.data.id)
        }
        case SAVE_TODO_SUCCESS: {
            const index = state.findIndex(todo => todo.id === action.data.id)
            return state.set(index, action.data)
        }
        case RECEIVE_TODOS: {
            return state.concat(action.data)
        }
        default: {
            return state
        }
    }
}

export default todos
