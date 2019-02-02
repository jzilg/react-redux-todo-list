import Action from '../../interfaces/action.interface'

export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR '

export const apiRequest = (url: string, method: string, body: string, entity: string): Action => ({
    type: `${entity} ${API_REQUEST}`,
    payload: {
        url,
        method,
        body,
    },
    meta: {
        entity,
    },
})

export const apiSuccess = (response: object, entity: string): Action => ({
    type: `${entity} ${API_SUCCESS}`,
    payload: {
        response,
    },
    meta: {
        entity,
    },
})

export const apiError = (error, entity): Action => ({
    type: `${entity} ${API_ERROR}`,
    payload: {
        error,
    },
    meta: {
        entity,
    },
})
