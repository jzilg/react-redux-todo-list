import expect from 'expect'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import apiMiddleware from '../../../src/redux/middleware/api.middleware'
import { saveTodo, SAVE_TODO_REQUEST } from '../../../src/redux/actions/save-todo.actions'

describe('saveTodo', () => {
    const middleware = [apiMiddleware]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action SAVE_TODO_SUCCESS when save todo has been done', async () => {
        fetchMock.putOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            {
                type: SAVE_TODO_REQUEST,
                payload: expect.any(Object),
            },
        ]

        await store.dispatch(saveTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
