import configureMockStore from 'redux-mock-store'
import BACKEND_URL from '../../../src/constants/api'
import {
    addTodo,
    addTodoSuccess,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
} from '../../../src/redux/actions/add-todo.actions'

describe('addEmptyTodo', () => {
    const mockStore = configureMockStore()
    const todo = {
        id: 1,
    }

    it('should create the action ADD_TODO_REQUEST when addEmptyTodo is called', () => {
        const store = mockStore()
        const url = `${BACKEND_URL}/todos`
        const method = 'POST'
        const body = JSON.stringify(todo)
        const successAction = addTodoSuccess

        const expectedActions = [
            {
                type: ADD_TODO_REQUEST,
                meta: {
                    api: {
                        url,
                        method,
                        body,
                        successAction,
                    },
                    ui: {
                        showLoader: true,
                    },
                },
            },
        ]

        store.dispatch(addTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should create the action ADD_TODO_REQUEST when addEmptyTodo is called', () => {
        const store = mockStore()

        const expectedActions = [
            {
                type: ADD_TODO_SUCCESS,
                payload: {
                    todo,
                },
                meta: {
                    ui: {
                        showLoader: false,
                    },
                },
            },
        ]

        store.dispatch(addTodoSuccess(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
