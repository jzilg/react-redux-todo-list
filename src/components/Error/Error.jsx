import React from 'react'
import PropTypes from 'prop-types'
import './error.scss'

const Error = ({ obj }) => (
    <div className="container">
        <div className="error">
            <h2>
                {obj.message}
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
    obj: PropTypes.object.isRequired,
}

export default Error
