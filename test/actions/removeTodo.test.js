import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    removeTodo,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
} from '../../src/redux/actions'

describe('removeTodo', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    it('should create the action SAVE_TODO_SUCCESS when save todo has been done', () => {
        fetchMock.deleteOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            { type: REMOVE_TODO_REQUEST },
            { type: REMOVE_TODO_SUCCESS, data: todo },
        ]

        return store.dispatch(removeTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
