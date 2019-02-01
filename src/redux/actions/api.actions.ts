import Action from '../../interfaces/action.interface'
import { ApiRequestOptions } from '../middleware/api.middleware'

export const API_REQUEST = '[API] REQUEST'
export const API_SUCCESS = '[API] SUCCESS'
export const API_ERROR = '[API] ERROR'

export const apiRequest = (apiRequestOptions: ApiRequestOptions): Action => ({
    type: API_REQUEST,
    payload: { ...apiRequestOptions },
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
