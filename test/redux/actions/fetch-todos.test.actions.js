import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import BACKEND_URL from '../../../src/constants/api'
import {
    fetchTodos,
    receiveTodos,
    REQUEST_TODOS,
    RECEIVE_TODOS,
} from '../../../src/redux/actions/fetch-todos.actions'

describe('fetchTodos', () => {
    const mockStore = configureMockStore()
    const todos = [
        {
            id: 0,
        },
        {
            id: 1,
        },
    ]

    it('should create the action REQUEST_TODOS when fetchTodo is called', () => {
        const store = mockStore()
        const url = `${BACKEND_URL}/todos`
        const method = 'GET'
        const successAction = receiveTodos

        const expectedActions = [
            {
                type: REQUEST_TODOS,
                meta: {
                    api: {
                        url,
                        method,
                        successAction,
                    },
                    showLoader: true,
                },
            },
        ]

        store.dispatch(fetchTodos())
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should create the action RECEIVE_TODOS when receiveTodos is called', () => {
        const store = mockStore()

        const expectedActions = [
            {
                type: RECEIVE_TODOS,
                payload: {
                    todos,
                },
                meta: {
                    showLoader: false,
                },
            },
        ]

        store.dispatch(receiveTodos(todos))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
