import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    saveTodo,
    SAVE_TODO_REQUEST,
    SAVE_TODO_SUCCESS,
} from '../../src/redux/actions'

describe('saveTodo', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    it('should create the action SAVE_TODO_SUCCESS when save todo has been done', () => {
        fetchMock.putOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            { type: SAVE_TODO_REQUEST },
            { type: SAVE_TODO_SUCCESS, data: todo },
        ]

        return store.dispatch(saveTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
