import Action from '../interfaces/action.interface'
import Notification, { NotificationId } from '../../entities/notification.interface'

export const SET_LOADER = '[UI] SET_LOADER'
export const SET_NOTIFICATION = '[UI] SET_NOTIFICATION'
export const UNSET_NOTIFICATION = '[UI] UNSET_NOTIFICATION'

export const setLoader = (value: boolean, triggeredBy): Action => ({
    type: SET_LOADER,
    payload: {
        value,
    },
    meta: {
        triggeredBy,
    },
})

export const setNotification = (notification: Notification, triggeredBy: string): Action => ({
    type: SET_NOTIFICATION,
    payload: {
        notification,
    },
    meta: {
        triggeredBy,
    },
})

export const unsetNotification = (notificationId: NotificationId, triggeredBy: string): Action => ({
    type: UNSET_NOTIFICATION,
    payload: {
        notificationId,
    },
    meta: {
        triggeredBy,
    },
})
