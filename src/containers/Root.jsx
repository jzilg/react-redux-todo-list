import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducher from '../store/reducers'
import App from './App'

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducher, middleware)

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default Root
