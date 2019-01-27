import React, { ReactElement } from 'react'
import style from './error.scss'

interface ErrorProps {
    message: string,
}

const Error = ({ message }: ErrorProps): ReactElement<{}> => (
    <div className="container">
        <div className="error">
            <h2 className={style.title}>
                {message}
            </h2>
        </div>
    </div>
)

export default Error
