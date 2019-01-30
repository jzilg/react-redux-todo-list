import AppState from '../../interfaces/app-state.interface'
import Action from '../../interfaces/action.interface'
import Error from '../../interfaces/error.interface'
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from '../actions/add-todo.actions'
import { REQUEST_TODOS, RECEIVE_TODOS } from '../actions/fetch-todos.actions'
import { SAVE_TODO_REQUEST, SAVE_TODO_SUCCESS } from '../actions/save-todo.actions'
import { REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS } from '../actions/remove-todo.actions'
import { RECEIVE_ERROR } from '../actions/error.actions'

interface AppActionPayload {
    error: Error
}

interface AppAction extends Action {
    payload: AppActionPayload
}

const defaultState: AppState = {
    isLoading: false,
    error: {
        hasOccurred: false,
        message: '',
    },
}

function appReducer(state = defaultState, action: AppAction): AppState {
    switch (action.type) {
        case ADD_TODO_REQUEST:
        case SAVE_TODO_REQUEST:
        case REMOVE_TODO_REQUEST:
        case REQUEST_TODOS: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ADD_TODO_SUCCESS:
        case SAVE_TODO_SUCCESS:
        case REMOVE_TODO_SUCCESS:
        case RECEIVE_TODOS: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case RECEIVE_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: {
                    ...state.error,
                    hasOccurred: true,
                    message: action.payload.error.message,
                },
            }
        }
        default: {
            return state
        }
    }
}

export default appReducer
