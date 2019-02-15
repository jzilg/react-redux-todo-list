import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import store from './redux/store'
import './style/index.scss'

render(<Root store={store} />, document.getElementById('root'))
