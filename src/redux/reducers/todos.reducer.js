import { List } from 'immutable'
import {
    ADD_TODO_SUCCESS,
    RECEIVE_TODOS,
    REMOVE_TODO_SUCCESS,
    SAVE_TODO_SUCCESS,
} from '../actions/fetchTodos.actions'

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
