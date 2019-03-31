import configureMockStore from 'redux-mock-store'
import BACKEND_URL from '../../../src/constants/api'
import {
    removeTodo,
    removeTodoSuccess,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
} from '../../../src/redux/actions/remove-todo.actions'

describe('removeTodo', () => {
    const mockStore = configureMockStore()
    const todo = {
        id: 0,
    }

    it('should create the action REMOVE_TODO_REQUEST when removeTodo is called', () => {
        const store = mockStore()
        const url = `${BACKEND_URL}/todos/${todo.id}`
        const method = 'DELETE'
        const successAction = expect.any(Function)

        const expectedActions = [
            {
                type: REMOVE_TODO_REQUEST,
                meta: {
                    api: {
                        url,
                        method,
                        successAction,
                    },
                    ui: {
                        showLoader: true,
                    },
                },
            },
        ]

        store.dispatch(removeTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should create the action REMOVE_TODO_SUCCESS when removeTodoSuccess is called', () => {
        const store = mockStore()

        const expectedActions = [
            {
                type: REMOVE_TODO_SUCCESS,
                payload: {
                    todo,
                },
                meta: {
                    ui: {
                        showLoader: false,
                        notification: {
                            id: expect.any(Number),
                            duration: 4000,
                            message: 'Todo removed',
                            type: 'success',
                        },
                    },
                },
            },
        ]

        store.dispatch(removeTodoSuccess(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
