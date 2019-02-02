import Action from '../../interfaces/action.interface'

export const SET_IS_LOADING = '[APP] SET_IS_LOADING'

export const setIsLoading = (value: boolean, entity: string): Action => ({
    type: SET_IS_LOADING,
    payload: {
        value,
    },
    meta: {
        entity,
    },
})
