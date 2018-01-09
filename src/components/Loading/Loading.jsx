import React from 'react'
import spinner from './spinner.svg'
import './loading.scss'

const Loading = () => (
    <div styleName="loading">
        <img src={spinner} alt="Loading..." />
    </div>
)

export default Loading
