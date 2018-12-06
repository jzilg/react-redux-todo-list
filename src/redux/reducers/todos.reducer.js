import { RECEIVE_TODOS } from '../actions/fetch-todos.actions'
import { ADD_TODO_SUCCESS } from '../actions/add-todo.actions'
import { SAVE_TODO_SUCCESS } from '../actions/save-todo.actions'
import { REMOVE_TODO_SUCCESS } from '../actions/remove-todo.actions'

function todos(
    state = [],
    action,
) {
    switch (action.type) {
        case RECEIVE_TODOS: {
            return state.concat(action.payload.todos)
        }
        case ADD_TODO_SUCCESS: {
            return state.concat(action.payload.todo)
        }
        case SAVE_TODO_SUCCESS: {
            return state.map((todo) => {
                const updatedTodo = todo.id === action.payload.todo.id ? action.payload.todo : todo
                return updatedTodo
            })
        }
        case REMOVE_TODO_SUCCESS: {
            return state.filter(todo => todo.id !== action.payload.todo.id)
        }
        default: {
            return state
        }
    }
}

export default todos
