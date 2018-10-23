import { combineReducers } from 'redux'
import app from './app.reducer'
import todos from './todos.reducer'

const rootReducer = combineReducers({
    app,
    todos,
})

export default rootReducer
