import { applyMiddleware, compose, createStore } from 'redux'
import middleware from './middleware'
import rootReducer from './reducers/root.reducer'

declare global {
    interface Window {
        devToolsExtension: Function
    }
}

const enhancer = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : store => store,
)

export default createStore(rootReducer, undefined, enhancer)
