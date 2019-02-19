import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import { addTodo, ADD_TODO } from '../../../src/redux/actions/add-todo.actions'

describe('addTodo', () => {
    const mockStore = configureMockStore()
    const todo = {
        id: 1,
    }

    it('should create the action ADD_TODO when addEmptyTodo is called', () => {
        const store = mockStore()

        const expectedActions = [
            {
                type: ADD_TODO,
                payload: {
                    todo,
                },
            },
        ]

        store.dispatch(addTodo(todo))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
