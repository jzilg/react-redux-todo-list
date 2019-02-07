import Todo from '../../interfaces/todo.interface'
import Action from '../interfaces/action.interface'
import { ADD_TODO_SUCCESS } from '../actions/add-todo.actions'
import { RECEIVE_TODOS } from '../actions/fetch-todos.actions'
import { SAVE_TODO_SUCCESS } from '../actions/save-todo.actions'
import { REMOVE_TODO_SUCCESS } from '../actions/remove-todo.actions'

export type TodosState = Todo[]

interface TodosReducerPayload {
    todos?: Todo[]
    todo?: Todo
}

interface TodosReducerAction extends Action {
    payload: TodosReducerPayload
}

export const defaultState: TodosState = []

function todosReducer(state = defaultState, action: TodosReducerAction): TodosState {
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

export default todosReducer
