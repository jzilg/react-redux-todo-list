import React from 'react'
import PropTypes from 'prop-types'
import './error.scss'

const Error = ({ message }) => (
    <div className="container">
        <div className="error">
            <h2>
                {message}
            </h2>
            <p>
                Is
                {' '}
                <a styleName="link" href={BACKEND_URL}>
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
