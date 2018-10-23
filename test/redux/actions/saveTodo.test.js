import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { RECEIVE_ERROR } from '../../../src/redux/actions/error.actions'
import {
    saveTodo,
    SAVE_TODO_REQUEST,
    SAVE_TODO_SUCCESS,
} from '../../../src/redux/actions/saveTodo.actions'

describe('saveTodo', () => {
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

    it('should create the action RECEIVE_ERROR when save todo has failed', () => {
        const error = 'Error'
        fetchMock.mock('*', { throws: error })

        const store = mockStore()
        const expectedActions = [
            { type: SAVE_TODO_REQUEST },
            { type: RECEIVE_ERROR, error },
        ]

        return store.dispatch(saveTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
