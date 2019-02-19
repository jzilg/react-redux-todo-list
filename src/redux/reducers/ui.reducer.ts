import Action from '../interfaces/action.interface'
import Error from '../../entities/error.interface'
import Notification, { NotificationId } from '../../entities/notification.interface'
import { RECEIVE_ERROR } from '../actions/error.actions'
import { UNSET_NOTIFICATION, SET_LOADER, SET_NOTIFICATION } from '../actions/ui.actions'

export interface UiState {
    numOfLoadingRequests: number
    isLoading: boolean
    error: Error
    notifications: Notification[]
}

interface UiAction extends Action {
    payload: {
        errorMsg?: string
        value?: boolean
        notification: Notification
        notificationId: NotificationId
    }
}

export const defaultState: UiState = {
    numOfLoadingRequests: 0,
    isLoading: false,
    error: {
        hasOccurred: false,
        message: '',
    },
    notifications: [],
}

function appReducer(state = defaultState, action: UiAction): UiState {
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
                numOfLoadingRequests: 0,
                isLoading: false,
                error: {
                    hasOccurred: true,
                    message: action.payload.errorMsg,
                },
            }
        }
        case SET_NOTIFICATION: {
            return {
                ...state,
                notifications: state.notifications.concat(action.payload.notification),
            }
        }
        case UNSET_NOTIFICATION: {
            const notificationIdToRemove = action.payload.notificationId
            const updatedNotifications = state.notifications.filter(
                notification => notification.id !== notificationIdToRemove,
            )
            return {
                ...state,
                notifications: updatedNotifications,
            }
        }
        default: {
            return state
        }
    }
}

export default appReducer
