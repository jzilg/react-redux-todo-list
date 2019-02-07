import expect from 'expect'
import uiReducer, { defaultState } from '../../../src/redux/reducers/ui.reducer'
import { RECEIVE_ERROR } from '../../../src/redux/actions/error.actions'
import { SET_LOADER } from '../../../src/redux/actions/ui.actions'

describe('uiReducer', () => {
    const loadingState = {
        ...defaultState,
        numOfLoadingRequests: 1,
        isLoading: true,
    }

    it('should return the initial state if no matching action is called', () => {
        const action = {
            type: '',
            payload: {},
        }

        expect(uiReducer(undefined, action)).toEqual(defaultState)
    })

    it('should return loading state if SET_LOADER is called with value true', () => {
        const action = {
            type: SET_LOADER,
            payload: {
                value: true,
            },
        }

        const expectedState = {
            ...defaultState,
            numOfLoadingRequests: 1,
            isLoading: true,
        }

        expect(uiReducer(defaultState, action)).toEqual(expectedState)
    })

    it('should return non loading state if SET_LOADER is called with value false', () => {
        const action = {
            type: SET_LOADER,
            payload: {
                value: false,
            },
        }

        expect(uiReducer(loadingState, action)).toEqual(defaultState)
    })

    it('should return error state if RECEIVE_ERROR is called', () => {
        const errorMsg = 'Error!'
        const action = {
            type: RECEIVE_ERROR,
            payload: {
                errorMsg,
            },
        }

        const expectedState = {
            ...defaultState,
            isLoading: false,
            error: {
                hasOccurred: true,
                message: errorMsg,
            },
        }

        expect(uiReducer(loadingState, action)).toEqual(expectedState)
    })
})
