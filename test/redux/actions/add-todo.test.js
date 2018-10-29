import expect from 'expect'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import apiMiddleware from '../../../src/redux/middleware/api.middleware'
import { addTodo, ADD_TODO_REQUEST } from '../../../src/redux/actions/add-todo.actions'

describe('addTodo', () => {
    const middleware = [apiMiddleware]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action SAVE_TODO_SUCCESS when add todo has been done', async () => {
        fetchMock.postOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            {
                type: ADD_TODO_REQUEST,
                payload: expect.any(Object),
            },
        ]

        await store.dispatch(addTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
