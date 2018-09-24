import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    fetchTodos,
    REQUEST_TODOS,
    RECEIVE_TODOS,
    RECEIVE_ERROR,
} from '../../src/redux/actions'

describe('fetchTodos', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todos = []

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action RECEIVE_TODOS when fetching todos has been done', () => {
        fetchMock.getOnce('*', {
            todos,
        })

        const store = mockStore()
        const expectedActions = [
            { type: REQUEST_TODOS },
            { type: RECEIVE_TODOS, data: { todos } },
        ]

        return store.dispatch(fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create the action RECEIVE_ERROR when fetching todos has failed', () => {
        const error = 'Error'
        fetchMock.mock('*', { throws: error })

        const store = mockStore()
        const expectedActions = [
            { type: REQUEST_TODOS },
            { type: RECEIVE_ERROR, error },
        ]

        return store.dispatch(fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
