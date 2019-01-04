import React from 'react'
import PropTypes from 'prop-types'
import style from './error.scss'

const Error = ({ message }) => (
    <div className="container">
        <div className="error">
            <h2>
                {message}
            </h2>
            <p>
                Is
                {' '}
                <a className={style.link} href={BACKEND_URL}>
                    {BACKEND_URL}
                </a>
                {' '}
                active?
            </p>
        </div>
    </div>
)

Error.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Error
