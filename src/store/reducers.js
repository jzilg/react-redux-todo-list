import { combineReducers } from 'redux'
import {
    REQUEST_TODOS,
    RECEIVE_TODOS,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    SAVE_TODO_REQUEST,
    SAVE_TODO_SUCCESS,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
    RECEIVE_ERROR,
} from './actions'

function app(
    state = {
        isLoading: false,
        error: {
            appears: false,
            msg: null,
        },
    },
    action,
) {
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
                    appears: true,
                    obj: action.error,
                },
            }
        }
        default: {
            return state
        }
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO_SUCCESS: {
            const newState = [
                ...state,
                action.data,
            ]
            return newState
        }
        case REMOVE_TODO_SUCCESS: {
            const newState = [...state]
            return newState.filter(todo => todo.id !== action.data.id)
        }
        case SAVE_TODO_SUCCESS: {
            const { data } = action
            const newState = [...state]

            newState.forEach((todo, index) => {
                if (todo.id === data.id) {
                    newState[index] = data
                }
            })

            return newState
        }
        case RECEIVE_TODOS: {
            const newState = [...state]
            return newState.concat(action.data)
        }
        default: {
            return state
        }
    }
}

const rootReducer = combineReducers({
    app,
    todos,
})

export default rootReducer
