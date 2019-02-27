import { applyMiddleware, compose, createStore } from 'redux'
import middleware from './middleware'
import rootReducer from './reducers/root.reducer'
import applyDevtoolExtension from './redux-devtools-extension'

const enhancer = compose(
    applyMiddleware(...middleware),
    applyDevtoolExtension(),
)

export default createStore(rootReducer, undefined, enhancer)
