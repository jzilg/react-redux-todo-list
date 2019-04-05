import Action from '../interfaces/action.interface'
import Notification, { NotificationId } from '../../entities/notification.interface'
import { UNSET_NOTIFICATION, SET_LOADER, SET_NOTIFICATION } from '../actions/ui.actions'

export interface UiState {
    numOfLoadingRequests: number
    isLoading: boolean
    notifications: Notification[]
}

interface UiAction extends Action {
    payload: {
        value?: boolean
        notification?: Notification
        notificationId?: NotificationId
    }
}

export const defaultState: UiState = {
    numOfLoadingRequests: 0,
    isLoading: false,
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
        case SET_NOTIFICATION: {
            return {
                ...state,
                notifications: state.notifications.concat(action.payload.notification),
            }
        }
        case UNSET_NOTIFICATION: {
            const notificationIdToRemove = action.payload.notificationId
            const updatedNotifications = state.notifications.filter(notification => (
                notification.id !== notificationIdToRemove
            ))
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
