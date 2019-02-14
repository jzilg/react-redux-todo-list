import { combineReducers } from 'redux'
import uiReducer from './ui.reducer'
import todosReducer from './todos.reducer'

const rootReducer = combineReducers({
    ui: uiReducer,
    todos: todosReducer,
})

export default rootReducer
