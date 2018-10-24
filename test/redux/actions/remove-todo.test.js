import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { RECEIVE_ERROR } from '../../../src/redux/actions/error.actions'
import {
    removeTodo,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
} from '../../../src/redux/actions/remove-todo.actions'

describe('removeTodo', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action SAVE_TODO_SUCCESS when save todo has been done', () => {
        fetchMock.deleteOnce('*', {
            todo,
        })

        const store = mockStore()
        const expectedActions = [
            { type: REMOVE_TODO_REQUEST },
            { type: REMOVE_TODO_SUCCESS, payload: { todo } },
        ]

        return store.dispatch(removeTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })


    it('should create the action RECEIVE_ERROR when remove todo has failed', () => {
        const error = 'Error'
        fetchMock.mock('*', { throws: error })

        const store = mockStore()
        const expectedActions = [
            { type: REMOVE_TODO_REQUEST },
            { type: RECEIVE_ERROR, payload: { error } },
        ]

        return store.dispatch(removeTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
