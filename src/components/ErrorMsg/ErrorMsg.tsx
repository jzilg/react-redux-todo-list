import React, { ReactElement } from 'react'
import style from './error-msg.scss'

interface ErrorProps {
    message: string
}

const ErrorMsg = ({ message }: ErrorProps): ReactElement<{}> => (
    <div className="container">
        <div className="error">
            <h2 className={style.title}>
                {message}
            </h2>
        </div>
    </div>
)

export default ErrorMsg
