import Action from '../../interfaces/action.interface'

export const SET_LOADER = '[UI] SET_LOADER'

export const setLoader = (value: boolean): Action => ({
    type: SET_LOADER,
    payload: {
        value,
    },
})
