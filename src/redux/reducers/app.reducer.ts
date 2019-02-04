import Action from '../../interfaces/action.interface'
import AppState from '../../interfaces/app-state.interface'
import Error from '../../interfaces/error.interface'
import { RECEIVE_ERROR } from '../actions/error.actions'
import { SET_IS_LOADING } from '../actions/app.actions'

interface AppActionPayload {
    error: Error
    value: boolean
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
    switch (true) {
        case action.type.includes(SET_IS_LOADING): {
            return {
                ...state,
                isLoading: action.payload.value,
            }
        }
        case action.type.includes(RECEIVE_ERROR): {
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
