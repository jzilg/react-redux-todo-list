import { combineReducers } from 'redux'
import appReducer from './app.reducer'
import todosReducer from './todos.reducer'

const rootReducer = combineReducers({
    app: appReducer,
    todos: todosReducer,
})

export default rootReducer
