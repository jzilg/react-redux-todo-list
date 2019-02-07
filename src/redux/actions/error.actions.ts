import Action from '../interfaces/action.interface'

export const RECEIVE_ERROR = 'RECEIVE_ERROR'

export const receiveError = (errorMsg: string): Action => ({
    type: RECEIVE_ERROR,
    payload: {
        errorMsg,
    },
})
