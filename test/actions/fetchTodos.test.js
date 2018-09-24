import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    fetchTodos,
    REQUEST_TODOS,
    RECEIVE_TODOS,
} from '../../src/redux/actions'

describe('fetchTodos', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todos = []

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
})
