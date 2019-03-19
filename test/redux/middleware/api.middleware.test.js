import configureMockStore from 'redux-mock-store'
import apiMiddleware from '../../../src/redux/middleware/api.middleware'
import { API_ERROR, API_REQUEST, API_SUCCESS } from '../../../src/redux/actions/api.actions'

describe('apiMiddleware', () => {
    const mockStore = configureMockStore()
    const next = jest.fn()

    afterEach(() => {
        fetch.resetMocks()
    })

    it('should call API_REQUEST action if action.meta.api is set', () => {
        const store = mockStore()
        const action = {
            type: 'SOME_ACTION',
            meta: {
                api: {},
            },
        }

        apiMiddleware(store)(next)(action)

        const executedActions = store.getActions()
        expect(executedActions[0].type).toBe(API_REQUEST)
    })

    it('should not call dispatch an action if no meta.showLoader is set', () => {
        const store = jest.fn()
        store.dispatch = jest.fn()
        const action = {
            type: 'SOME_ACTION',
        }

        apiMiddleware(store)(next)(action)

        expect(store.dispatch.mock.calls.length).toEqual(0)
    })

    it('should call apiSuccess if action is API_REQUEST and fetch is successfull', () => {
        const store = {}
        const successAction = () => {}
        store.dispatch = jest.fn()

        const action = {
            type: API_REQUEST,
            payload: {
                url: 'http://test.de',
                method: 'GET',
                successAction,
            },
            meta: {
                triggeredBy: 'SOME_ACTION',
            },
        }

        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
        apiMiddleware(store)(next)(action)

        setTimeout(() => {
            expect(store.dispatch.mock.calls[0][0].payload.successAction).toBe(successAction)
        }, 0)
    })

    it('should call apiError if action is API_REQUEST and fetch is not successfull', () => {
        const errorMsg = 'Error!'
        const store = {}
        const successAction = () => {}
        store.dispatch = jest.fn()

        const action = {
            type: API_REQUEST,
            payload: {
                url: 'http://test.de',
                method: 'GET',
                successAction,
            },
            meta: {
                triggeredBy: 'SOME_ACTION',
            },
        }

        fetch.mockRejectOnce(new Error(errorMsg))
        apiMiddleware(store)(next)(action)

        setTimeout(() => {
            expect(store.dispatch.mock.calls[0][0].payload.errorMsg).toBe(errorMsg)
        }, 0)
    })

    it('should call successAction if action is API_SUCCESS', () => {
        const store = jest.fn()
        store.dispatch = jest.fn()
        const successAction = jest.fn()
        const action = {
            type: API_SUCCESS,
            payload: {
                successAction,
            },
        }

        apiMiddleware(store)(next)(action)

        expect(successAction.mock.calls.length).toBe(1)
    })
})
