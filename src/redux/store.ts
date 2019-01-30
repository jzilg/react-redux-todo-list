import { applyMiddleware, compose, createStore } from 'redux'
import apiMiddleware from './middleware/api.middleware'
import rootReducer from './reducers/root.reducer'

declare global {
    interface Window {
        devToolsExtension: Function
    }
}

const enhancer = compose(
    applyMiddleware(apiMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : store => store,
)

export default createStore(rootReducer, undefined, enhancer)
