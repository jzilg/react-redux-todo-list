import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import store from './redux/store'
import './style/index.scss'

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
