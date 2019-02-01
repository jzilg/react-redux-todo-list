import Action from '../../interfaces/action.interface'

export const API_REQUEST = '[API] REQUEST'
export const API_SUCCESS = '[API] SUCCESS'
export const API_ERROR = '[API] ERROR'

export const apiRequest = (
    url: string,
    method: string,
    successAction: Function,
    body?: string,
): Action => ({
    type: API_REQUEST,
    payload: {
        url,
        method,
        body,
        successAction,
    },
})

export const apiSuccess = (successAction: Function, data: object): Action => ({
    type: API_SUCCESS,
    payload: {
        successAction,
        data,
    },
})

export const apiError = (errorMsg: string): Action => ({
    type: API_ERROR,
    payload: {
        errorMsg,
    },
})
