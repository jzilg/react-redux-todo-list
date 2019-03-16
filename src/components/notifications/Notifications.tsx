import React, { ReactElement } from 'react'
import Notification from '../../entities/notification.interface'
import style from './notifications.scss'

interface Props {
    notifications: Notification[]
    removeNotification: Function
}

const Notifications = ({ notifications, removeNotification }: Props): ReactElement<{}> => {
    if (!notifications.length) {
        return null
    }

    const notificationMessageElements = notifications.map((notification) => {
        const { id, type, message } = notification

        function clickHandler(): void {
            removeNotification(id, 'button on notification itself clicked')
        }

        return (
            <li key={id} className={style[type]}>
                <div className={style.container}>
                    <span>
                        {message}
                    </span>
                    <button onClick={clickHandler} className={style.button} type="button">
                        ✕
                    </button>
                </div>
            </li>
        )
    })

    return (
        <ul className={style.list}>
            {notificationMessageElements}
        </ul>
    )
}

export default Notifications
