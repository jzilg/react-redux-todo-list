import configureMockStore from 'redux-mock-store'
import {
    API_REQUEST,
    API_SUCCESS,
    API_ERROR,
    apiRequest,
    apiSuccess,
    apiError,
} from '../../../src/redux/actions/api.actions'

describe('api.actions', () => {
    const mockStore = configureMockStore()
    const triggeredBy = 'SOME_ACTION'
    const successAction = () => {}

    it('should return correct action if apiRequest is called', () => {
        const store = mockStore()
        const apiRequestOptions = {
            url: 'http://test.de',
            method: 'GET',
            successAction,
        }

        const expectedActions = [
            {
                type: API_REQUEST,
                payload: {
                    ...apiRequestOptions,
                },
                meta: {
                    triggeredBy,
                },
            },
        ]

        store.dispatch(apiRequest(apiRequestOptions, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should return correct action if apiSuccess is called', () => {
        const store = mockStore()
        const data = [
            'foo',
            'bar',
        ]

        const expectedActions = [
            {
                type: API_SUCCESS,
                payload: {
                    successAction,
                    data,
                },
                meta: {
                    triggeredBy,
                },
            },
        ]

        store.dispatch(apiSuccess(successAction, data, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should return correct action if apiErroris called', () => {
        const store = mockStore()
        const errorMsg = 'Error!'

        const expectedActions = [
            {
                type: API_ERROR,
                payload: {
                    errorMsg,
                },
                meta: {
                    triggeredBy,
                    notification: {
                        id: expect.any(Number),
                        message: 'Error!',
                        type: 'error',
                    },
                    showLoader: false,
                },
            },
        ]

        store.dispatch(apiError(errorMsg, triggeredBy))

        expect(store.getActions()).toEqual(expectedActions)
    })
})
