import expect from 'expect'
import todosReducer, { defaultState } from '../../../src/redux/reducers/todos.reducer'
import { ADD_TODO_SUCCESS } from '../../../src/redux/actions/add-todo.actions'
import { RECEIVE_TODOS } from '../../../src/redux/actions/fetch-todos.actions'
import { SAVE_TODO_SUCCESS } from '../../../src/redux/actions/save-todo.actions'
import { REMOVE_TODO_SUCCESS } from '../../../src/redux/actions/remove-todo.actions'

describe('todosReducer', () => {
    const todos = [
        {
            id: 0,
            name: 'Todo0',
            schedule: 0,
            lastEvent: '2017-01-01',
        },
        {
            id: 1,
            name: 'Todo1',
            schedule: 1,
            lastEvent: '2017-01-02',
        },
    ]

    it('should return the initial state if no matching action is called', () => {
        const action = {
            type: '',
            payload: {},
        }

        expect(todosReducer(undefined, action)).toEqual(defaultState)
    })

    it('should handle RECEIVE_TODOS', () => {
        const action = {
            type: RECEIVE_TODOS,
            payload: {
                todos,
            },
        }

        const expectedState = todos

        expect(todosReducer(defaultState, action)).toEqual(expectedState)
    })

    it('should handle ADD_TODO_SUCCESS', () => {
        const todo = todos[0]

        const action = {
            type: ADD_TODO_SUCCESS,
            payload: {
                todo,
            },
        }

        const expectedState = defaultState.concat(todo)

        expect(todosReducer(defaultState, action)).toEqual(expectedState)
    })

    it('should handle SAVE_TODO_SUCCESS', () => {
        const updatedTodo = {
            ...todos[0],
            name: 'Todo2',
        }

        const action = {
            type: SAVE_TODO_SUCCESS,
            payload: {
                todo: updatedTodo,
            },
        }

        const defaultStateWithTodos = todos

        const expectedState = [
            updatedTodo,
            todos[1],
        ]

        expect(todosReducer(defaultStateWithTodos, action)).toEqual(expectedState)
    })

    it('should handle REMOVE_TODO_SUCCESS', () => {
        const todo = todos[0]

        const action = {
            type: REMOVE_TODO_SUCCESS,
            payload: {
                todo,
            },
        }

        const defaultStateWithTodos = todos

        const expectedState = [
            todos[1],
        ]

        expect(todosReducer(defaultStateWithTodos, action)).toEqual(expectedState)
    })
})
