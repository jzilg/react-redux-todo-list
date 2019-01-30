import Action from '../../interfaces/action.interface'
import Error from '../../interfaces/error.interface'

export const RECEIVE_ERROR = 'RECEIVE_ERROR'

export const receiveError = (error: Error): Action => ({
    type: RECEIVE_ERROR,
    payload: {
        error,
    },
})
