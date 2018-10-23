import { Map } from 'immutable'
import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS, RECEIVE_ERROR, RECEIVE_TODOS,
    REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS,
    REQUEST_TODOS,
    SAVE_TODO_REQUEST, SAVE_TODO_SUCCESS
} from '../actions/fetchTodos.actions'

function app(
    state = Map({
        isLoading: false,
        error: Map({
            hasOccurred: false,
            message: '',
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
                .setIn(['error', 'hasOccurred'], true)
                .setIn(['error', 'message'], action.error.message)
        }
        default: {
            return state
        }
    }
}

export default app
