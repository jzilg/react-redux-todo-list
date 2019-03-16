import React, { ReactElement } from 'react'
import spinner from './spinner.svg'
import style from './loading.scss'

const Loading = (): ReactElement<{}> => (
    <div className={style.loading}>
        <img src={spinner} alt="Loading..." />
    </div>
)

export default Loading
