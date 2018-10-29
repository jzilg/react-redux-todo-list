import expect from 'expect'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import apiMiddleware from '../../../src/redux/middleware/api.middleware'
import { fetchTodos, REQUEST_TODOS } from '../../../src/redux/actions/fetch-todos.actions'

describe('fetchTodos', () => {
    const middleware = [apiMiddleware]
    const mockStore = configureMockStore(middleware)
    const todos = []

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action RECEIVE_TODOS when fetching todos has been done', async () => {
        fetchMock.getOnce('*', todos)

        const store = mockStore()
        const expectedActions = [
            {
                type: REQUEST_TODOS,
                payload: expect.any(Object),
            },
        ]

        await store.dispatch(fetchTodos())
        expect(store.getActions()).toEqual(expectedActions)
    })
})
