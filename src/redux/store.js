import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root.reducer'

const middlewareComposer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : store => store,
)

const store = createStore(
    rootReducer,
    {},
    middlewareComposer,
)

export default store
