import expect from 'expect'
import { Map, List } from 'immutable'
import rootReducer from '../../src/redux/reducers/root.reducer'
import { REQUEST_TODOS, RECEIVE_TODOS } from '../../src/redux/actions/fetch-todos.actions'
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from '../../src/redux/actions/add-todo.actions'
import { SAVE_TODO_REQUEST, SAVE_TODO_SUCCESS } from '../../src/redux/actions/save-todo.actions'
import { REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS } from '../../src/redux/actions/remove-todo.actions'
import { RECEIVE_ERROR } from '../../src/redux/actions/error.actions'

describe('rootReducer', () => {
    const initStates = {
        app: Map({
            isLoading: false,
            error: Map({
                hasOccurred: false,
                message: '',
            }),
        }),
        todos: List(),
    }
    const loadingStates = {
        app: initStates.app.set('isLoading', true),
        todos: List(),
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
            todos: List(todos),
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
            todos: initStates.todos.push(todo),
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
            todos: initStates.todos.push(todo),
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
            todos: initStates.todos.push(todo),
        }
        const action = {
            type: REMOVE_TODO_SUCCESS,
            payload: {
                todo,
            },
        }
        const expectedState = {
            app: initStates.app,
            todos: List(),
        }
        expect(rootReducer(initStatesWithTodo, action)).toEqual(expectedState)
    })

    it('should handle RECEIVE_ERROR', () => {
        const error = {
            message: 'Error',
        }
        const action = {
            type: RECEIVE_ERROR,
            payload: {
                error,
            },
        }
        const expectedState = {
            app: initStates.app
                .set('isLoading', false)
                .setIn(['error', 'hasOccurred'], true)
                .setIn(['error', 'message'], error.message),
            todos: initStates.todos,
        }
        expect(rootReducer(initStates, action)).toEqual(expectedState)
    })
})