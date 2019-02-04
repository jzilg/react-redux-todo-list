import Action from '../../interfaces/action.interface'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const setIsLoading = (value: boolean, entity: string): Action => ({
    type: `${entity} ${SET_IS_LOADING}`,
    payload: {
        value,
    },
    meta: {
        entity,
    },
})
