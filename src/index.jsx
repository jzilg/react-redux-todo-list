import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducher from './store/reducers'
import Root from './containers/Root'
import './style/index.scss'

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducher, middleware)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
