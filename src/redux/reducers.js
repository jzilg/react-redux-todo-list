import { Map, List } from 'immutable'
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
    state = Map({
        isLoading: false,
        error: Map({
            appears: false,
            msg: null,
        }),
    }),
    action,
) {
    switch (action.type) {
        case ADD_TODO_REQUEST:
        case SAVE_TODO_REQUEST:
        case REMOVE_TODO_REQUEST:
        case REQUEST_TODOS: {
            return state.set('isLoading', true)
        }
        case ADD_TODO_SUCCESS:
        case SAVE_TODO_SUCCESS:
        case REMOVE_TODO_SUCCESS:
        case RECEIVE_TODOS: {
            return state.set('isLoading', false)
        }
        case RECEIVE_ERROR: {
            return state
                .set('isLoading', false)
                .setIn(['error', 'appears'], true)
                .setIn(['error', 'obj'], action.error)
        }
        default: {
            return state
        }
    }
}

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

const rootReducer = combineReducers({
    app,
    todos,
})

export default rootReducer
