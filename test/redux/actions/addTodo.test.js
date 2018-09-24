import expect from 'expect'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
    addTodo,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    RECEIVE_ERROR,
} from '../../../src/redux/actions'

describe('addTodo', () => {
    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)
    const todo = {
        id: 1,
    }

    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('should create the action SAVE_TODO_SUCCESS when add todo has been done', () => {
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

    it('should create the action RECEIVE_ERROR when add todo has failed', () => {
        const error = 'Error'
        fetchMock.mock('*', { throws: error })

        const store = mockStore()
        const expectedActions = [
            { type: ADD_TODO_REQUEST },
            { type: RECEIVE_ERROR, error },
        ]

        return store.dispatch(addTodo(todo)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
