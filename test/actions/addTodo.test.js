import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    addTodo,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
} from '../../src/redux/actions'

describe('addTodo', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    it('should create the action SAVE_TODO_SUCCESS when save todo has been done', () => {
        fetchMock.postOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            { type: ADD_TODO_REQUEST },
            { type: ADD_TODO_SUCCESS, data: todo },
        ]

        return store.dispatch(addTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
