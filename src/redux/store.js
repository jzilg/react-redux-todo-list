import { applyMiddleware, compose, createStore } from 'redux'
import apiMiddleware from './middleware/api.middleware'
import rootReducer from './reducers/root.reducer'

const enhancer = compose(
    applyMiddleware(apiMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : store => store,
)

export default createStore(rootReducer, {}, enhancer)
