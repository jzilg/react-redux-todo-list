import React from 'react'
import PropTypes from 'prop-types'
import style from './error.scss'

const Error = ({ message }) => (
    <div className="container">
        <div className="error">
            <h2 className={style.title}>
                {message}
            </h2>
        </div>
    </div>
)

Error.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Error
