import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import Root from './containers/Root'
import './style/index.scss'

const middlewareComposer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : store => store,
)

const store = createStore(
    rootReducer,
    {},
    middlewareComposer,
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
