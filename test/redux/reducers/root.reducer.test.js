import expect from 'expect'
import rootReducer from '../../../src/redux/reducers/root.reducer'
import { defaultState as uiDefaultState } from '../../../src/redux/reducers/ui.reducer'
import { defaultState as todosDefaultState } from '../../../src/redux/reducers/todos.reducer'

describe('rootReducer', () => {
    it('should contain all needed reducers', () => {
        const action = {
            type: '',
        }

        const expectedState = {
            ui: uiDefaultState,
            todos: todosDefaultState,
        }

        expect(rootReducer(undefined, action)).toEqual(expectedState)
    })
})
