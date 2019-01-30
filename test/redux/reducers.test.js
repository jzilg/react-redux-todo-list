import expect from 'expect'
import rootReducer from '../../src/redux/reducers/root.reducer'
import { REQUEST_TODOS, RECEIVE_TODOS } from '../../src/redux/actions/fetch-todos.actions'
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from '../../src/redux/actions/add-todo.actions'
import { SAVE_TODO_REQUEST, SAVE_TODO_SUCCESS } from '../../src/redux/actions/save-todo.actions'
import { REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS } from '../../src/redux/actions/remove-todo.actions'
import { RECEIVE_ERROR } from '../../src/redux/actions/error.actions'

describe('rootReducer', () => {
    const initStates = {
        app: {
            isLoading: false,
            error: {
                hasOccurred: false,
                message: '',
            },
        },
        todos: [],
    }
    const loadingStates = {
        app: {
            ...initStates.app,
            isLoading: true,
        },
        todos: [
            ...initStates.todos,
        ],
    }

    it('should return the initial state if no matching action is called', () => {
        expect(rootReducer(initStates, {
            type: '',
        })).toEqual(initStates)
    })

    it('should handle REQUEST_TODOS', () => {
        const action = {
            type: REQUEST_TODOS,
        }
        expect(rootReducer(initStates, action)).toEqual(loadingStates)
    })

    it('should handle RECEIVE_TODOS', () => {
        const todos = [
            { id: 0 },
            { id: 1 },
        ]
        const action = {
            type: RECEIVE_TODOS,
            payload: {
                todos,
            },
        }
        const expectedState = {
            app: initStates.app,
            todos,
        }
        expect(rootReducer(initStates, action)).toEqual(expectedState)
    })

    it('should handle ADD_TODO_REQUEST', () => {
        const action = {
            type: ADD_TODO_REQUEST,
        }
        expect(rootReducer(initStates, action)).toEqual(loadingStates)
    })

    it('should handle ADD_TODO_SUCCESS', () => {
        const todo = { id: 0 }
        const action = {
            type: ADD_TODO_SUCCESS,
            payload: {
                todo,
            },
        }
        const expectedState = {
            app: initStates.app,
            todos: initStates.todos.concat(todo),
        }
        expect(rootReducer(initStates, action)).toEqual(expectedState)
    })

    it('should handle SAVE_TODO_REQUEST', () => {
        const action = {
            type: SAVE_TODO_REQUEST,
        }
        expect(rootReducer(initStates, action)).toEqual(loadingStates)
    })

    it('should handle SAVE_TODO_SUCCESS', () => {
        const todo = { id: 0 }
        const initStatesWithTodo = {
            app: initStates.app,
            todos: initStates.todos.concat(todo),
        }
        const action = {
            type: SAVE_TODO_SUCCESS,
            payload: {
                todo,
            },
        }
        expect(rootReducer(initStatesWithTodo, action)).toEqual(initStatesWithTodo)
    })

    it('should handle REMOVE_TODO_REQUEST', () => {
        const action = {
            type: REMOVE_TODO_REQUEST,
        }
        expect(rootReducer(initStates, action)).toEqual(loadingStates)
    })

    it('should handle REMOVE_TODO_SUCCESS', () => {
        const todo = { id: 0 }
        const initStatesWithTodo = {
            app: initStates.app,
            todos: initStates.todos.concat(todo),
        }
        const action = {
            type: REMOVE_TODO_SUCCESS,
            payload: {
                todo,
            },
        }
        const expectedState = {
            app: initStates.app,
            todos: [],
        }
        expect(rootReducer(initStatesWithTodo, action)).toEqual(expectedState)
    })

    it('should handle RECEIVE_ERROR', () => {
        const error = {
            message: 'ErrorMsg',
        }
        const action = {
            type: RECEIVE_ERROR,
            payload: {
                error,
            },
        }
        const expectedState = {
            app: {
                ...initStates.app,
                isLoading: false,
                error: {
                    ...initStates.error,
                    hasOccurred: true,
                    message: error.message,
                },
            },
            todos: initStates.todos,
        }
        expect(rootReducer(initStates, action)).toEqual(expectedState)
    })
})
