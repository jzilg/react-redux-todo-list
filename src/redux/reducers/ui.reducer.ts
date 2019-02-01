import UiState from '../../interfaces/ui-state.interface'
import Action from '../../interfaces/action.interface'
import { RECEIVE_ERROR } from '../actions/error.actions'
import { SET_LOADER } from '../actions/ui.actions'

interface AppAction extends Action {
    payload: {
        errorMsg: string
        value: boolean
    }
}

const defaultState: UiState = {
    numOfLoadingRequests: 0,
    isLoading: false,
    error: {
        hasOccurred: false,
        message: '',
    },
}

function appReducer(state = defaultState, action: AppAction): UiState {
    switch (action.type) {
        case SET_LOADER: {
            const { value } = action.payload
            const { numOfLoadingRequests } = state
            const newNumOfLoadingRequests = value === false
                ? numOfLoadingRequests - 1
                : numOfLoadingRequests + 1

            return {
                ...state,
                numOfLoadingRequests: newNumOfLoadingRequests,
                isLoading: newNumOfLoadingRequests > 0,
            }
        }
        case RECEIVE_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: {
                    ...state.error,
                    hasOccurred: true,
                    message: action.payload.errorMsg,
                },
            }
        }
        default: {
            return state
        }
    }
}

export default appReducer
