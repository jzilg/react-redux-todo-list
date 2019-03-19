import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import BACKEND_URL from '../../../src/constants/api'
import {
    saveTodo,
    saveTodoSuccess,
    SAVE_TODO_REQUEST,
    SAVE_TODO_SUCCESS,
} from '../../../src/redux/actions/save-todo.actions'

describe('saveTodo', () => {
    const mockStore = configureMockStore()
    const todo = {
        id: 0,
    }

    it('should create the action SAVE_TODO_REQUEST when saveTodo is called', () => {
        const store = mockStore()
        const url = `${BACKEND_URL}/todos/${todo.id}`
        const method = 'PUT'
        const body = JSON.stringify(todo)
        const successAction = saveTodoSuccess

        const expectedActions = [
            {
                type: SAVE_TODO_REQUEST,
                meta: {
                    api: {
                        url,
                        method,
                        body,
                        successAction,
                    },
                    showLoader: true,
                },
            },
        ]

        store.dispatch(saveTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should create the action SAVE_TODO_SUCCESS when saveTodoSuccess is called', () => {
        const store = mockStore()

        const expectedActions = [
            {
                type: SAVE_TODO_SUCCESS,
                payload: {
                    todo,
                },
                meta: {
                    notification: {
                        id: expect.any(Number),
                        duration: 4000,
                        message: 'Todo saved',
                        type: 'success',
                    },
                    showLoader: false,
                },
            },
        ]

        store.dispatch(saveTodoSuccess(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
